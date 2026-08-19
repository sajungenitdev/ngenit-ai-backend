import { Request, Response } from "express";
import PrivacyPolicy from "../models/PrivacyPolicy";

// ============================================================
// GET - Fetch Privacy Policy
// ============================================================
export const getPrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        let query: any = {};
        if (status) {
            query.status = status;
        } else {
            query.status = { $in: ["published", "draft"] };
        }

        const policy = await PrivacyPolicy.findOne(query)
            .sort({ version: -1, updatedAt: -1 })
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found",
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching privacy policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get All Versions
// ============================================================
export const getAllPrivacyVersions = async (req: Request, res: Response) => {
    try {
        const policies = await PrivacyPolicy.find()
            .sort({ version: -1, updatedAt: -1 })
            .select("title version status publishedAt updatedAt")
            .lean();

        res.json({
            success: true,
            data: policies,
            count: policies.length,
        });
    } catch (error: any) {
        console.error("Error fetching privacy policy versions:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Specific Version
// ============================================================
export const getPrivacyPolicyVersion = async (req: Request, res: Response) => {
    try {
        const { version } = req.params;

        const policy = await PrivacyPolicy.findOne({ version: parseInt(version) })
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
        console.error("Error fetching privacy policy version:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// POST - Create or Update Privacy Policy
// ============================================================
export const createOrUpdatePrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const { title, content, status = "draft" } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }

        const existingPolicy = await PrivacyPolicy.findOne().sort({ version: -1 });

        let policy;

        if (existingPolicy) {
            policy = await PrivacyPolicy.findByIdAndUpdate(
                existingPolicy._id,
                {
                    title: title.trim(),
                    content: content,
                    status: status,
                    version: existingPolicy.version + 1,
                    lastUpdated: new Date(),
                    ...(status === "published" && !existingPolicy.publishedAt
                        ? { publishedAt: new Date() }
                        : {}),
                },
                { new: true, runValidators: true }
            ).lean();

            await PrivacyPolicy.findByIdAndUpdate(existingPolicy._id, {
                status: "archived",
            });
        } else {
            policy = await PrivacyPolicy.create({
                title: title.trim(),
                content: content,
                status: status,
                version: 1,
                ...(status === "published" ? { publishedAt: new Date() } : {}),
            });
        }

        res.status(201).json({
            success: true,
            message: "Privacy policy saved successfully",
            data: policy,
        });
    } catch (error: any) {
        console.error("Error saving privacy policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// PATCH - Publish Privacy Policy
// ============================================================
export const publishPrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await PrivacyPolicy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found",
            });
        }

        const publishedPolicy = await PrivacyPolicy.create({
            title: policy.title,
            content: policy.content,
            status: "published",
            version: policy.version + 1,
            publishedAt: new Date(),
            lastUpdated: new Date(),
            metadata: policy.metadata,
        });

        await PrivacyPolicy.findByIdAndUpdate(id, {
            status: "archived",
        });

        const result = await PrivacyPolicy.findById(publishedPolicy._id).lean();

        res.json({
            success: true,
            message: "Privacy policy published successfully",
            data: result,
        });
    } catch (error: any) {
        console.error("Error publishing privacy policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// PATCH - Archive Privacy Policy
// ============================================================
export const archivePrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await PrivacyPolicy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found",
            });
        }

        const archivedPolicy = await PrivacyPolicy.findByIdAndUpdate(
            id,
            {
                status: "archived",
                lastUpdated: new Date(),
            },
            { new: true }
        ).lean();

        res.json({
            success: true,
            message: "Privacy policy archived successfully",
            data: archivedPolicy,
        });
    } catch (error: any) {
        console.error("Error archiving privacy policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// DELETE - Delete Privacy Policy
// ============================================================
export const deletePrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await PrivacyPolicy.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found",
            });
        }

        if (policy.status === "published") {
            const publishedCount = await PrivacyPolicy.countDocuments({
                status: "published",
            });
            if (publishedCount === 1 && policy.status === "published") {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete the only published version. Archive it first.",
                });
            }
        }

        await PrivacyPolicy.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Privacy policy deleted successfully",
        });
    } catch (error: any) {
        console.error("Error deleting privacy policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Public Privacy Policy
// ============================================================
export const getPublicPrivacyPolicy = async (req: Request, res: Response) => {
    try {
        const policy = await PrivacyPolicy.findOne({ status: "published" })
            .sort({ version: -1 })
            .select("title content version publishedAt")
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Published privacy policy not found",
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching public privacy policy:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};