import { Request, Response } from "express";
import CookiePolicy, { ICookiePolicy } from "../models/CookiePolicy";

// ============================================================
// GET - Fetch Cookie Policy
// ============================================================
export const getCookiePolicy = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        let query: any = {};
        if (status) {
            query.status = status;
        } else {
            query.status = { $in: ["published", "draft"] };
        }

        const policy = await CookiePolicy.findOne(query)
            .sort({ version: -1, updatedAt: -1 })
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Cookie policy not found",
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching cookie policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get All Versions
// ============================================================
export const getAllVersions = async (req: Request, res: Response) => {
    try {
        const policies = await CookiePolicy.find()
            .sort({ version: -1, updatedAt: -1 })
            .select("title version status publishedAt updatedAt")
            .lean();

        res.json({
            success: true,
            data: policies,
            count: policies.length,
        });
    } catch (error: any) {
        console.error("Error fetching policy versions:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Specific Version
// ============================================================
export const getPolicyVersion = async (req: Request, res: Response) => {
    try {
        const { version } = req.params;

        const policy = await CookiePolicy.findOne({ version: parseInt(version) })
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: `Version ${version} not found`,
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching policy version:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// POST - Create or Update Cookie Policy
// ============================================================
export const createOrUpdateCookiePolicy = async (req: Request, res: Response) => {
    try {
        const { title, content, status = "draft" } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }

        // Check if a policy already exists
        const existingPolicy = await CookiePolicy.findOne().sort({ version: -1 });

        let policy: ICookiePolicy | null = null;

        if (existingPolicy) {
            // Update existing policy - increment version
            policy = await CookiePolicy.findByIdAndUpdate(
                existingPolicy._id,
                {
                    title: title.trim(),
                    content: content,
                    status: status,
                    version: existingPolicy.version + 1,
                    lastUpdated: new Date(),
                    // If status is 'published', set publishedAt
                    ...(status === "published" && !existingPolicy.publishedAt
                        ? { publishedAt: new Date() }
                        : {}),
                },
                { new: true, runValidators: true }
            ).lean();

            // Archive previous version
            await CookiePolicy.findByIdAndUpdate(existingPolicy._id, {
                status: "archived",
            });
        } else {
            // Create new policy
            policy = await CookiePolicy.create({
                title: title.trim(),
                content: content,
                status: status,
                version: 1,
                ...(status === "published" ? { publishedAt: new Date() } : {}),
            });
        }

        res.status(201).json({
            success: true,
            message: "Cookie policy saved successfully",
            data: policy,
        });
    } catch (error: any) {
        console.error("Error saving cookie policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// PATCH - Publish Cookie Policy
// ============================================================
export const publishCookiePolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await CookiePolicy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Cookie policy not found",
            });
        }

        // Create a new version with published status
        const publishedPolicy = await CookiePolicy.create({
            title: policy.title,
            content: policy.content,
            status: "published",
            version: policy.version + 1,
            publishedAt: new Date(),
            lastUpdated: new Date(),
            metadata: policy.metadata,
        });

        // Archive the old version
        await CookiePolicy.findByIdAndUpdate(id, {
            status: "archived",
        });

        const result = await CookiePolicy.findById(publishedPolicy._id).lean();

        res.json({
            success: true,
            message: "Cookie policy published successfully",
            data: result,
        });
    } catch (error: any) {
        console.error("Error publishing cookie policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// PATCH - Archive Cookie Policy
// ============================================================
export const archiveCookiePolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await CookiePolicy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Cookie policy not found",
            });
        }

        const archivedPolicy = await CookiePolicy.findByIdAndUpdate(
            id,
            {
                status: "archived",
                lastUpdated: new Date(),
            },
            { new: true }
        ).lean();

        res.json({
            success: true,
            message: "Cookie policy archived successfully",
            data: archivedPolicy,
        });
    } catch (error: any) {
        console.error("Error archiving cookie policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// DELETE - Delete Cookie Policy
// ============================================================
export const deleteCookiePolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await CookiePolicy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Cookie policy not found",
            });
        }

        // Don't allow deletion if it's the only published version
        if (policy.status === "published") {
            const publishedCount = await CookiePolicy.countDocuments({
                status: "published",
            });
            if (publishedCount === 1 && policy.status === "published") {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete the only published version. Archive it first.",
                });
            }
        }

        await CookiePolicy.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Cookie policy deleted successfully",
        });
    } catch (error: any) {
        console.error("Error deleting cookie policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Public Cookie Policy (for frontend display)
// ============================================================
export const getPublicCookiePolicy = async (req: Request, res: Response) => {
    try {
        const policy = await CookiePolicy.findOne({ status: "published" })
            .sort({ version: -1 })
            .select("title content version publishedAt")
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Published cookie policy not found",
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching public cookie policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Policy Statistics
// ============================================================
export const getPolicyStats = async (req: Request, res: Response) => {
    try {
        const [totalVersions, publishedCount, draftCount, archivedCount] =
            await Promise.all([
                CookiePolicy.countDocuments(),
                CookiePolicy.countDocuments({ status: "published" }),
                CookiePolicy.countDocuments({ status: "draft" }),
                CookiePolicy.countDocuments({ status: "archived" }),
            ]);

        const latest = await CookiePolicy.findOne()
            .sort({ version: -1 })
            .lean();

        res.json({
            success: true,
            data: {
                totalVersions,
                publishedCount,
                draftCount,
                archivedCount,
                latestVersion: latest?.version || 0,
                latestUpdatedAt: latest?.updatedAt || null,
            },
        });
    } catch (error: any) {
        console.error("Error fetching policy stats:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};