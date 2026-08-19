import { Request, Response } from "express";
import TermsConditions from "../models/TermsConditions";

// ============================================================
// GET - Fetch Terms & Conditions
// ============================================================
export const getTermsConditions = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        let query: any = {};
        if (status) {
            query.status = status;
        } else {
            query.status = { $in: ["published", "draft"] };
        }

        const policy = await TermsConditions.findOne(query)
            .sort({ version: -1, updatedAt: -1 })
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Terms & Conditions not found",
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching terms & conditions:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get All Versions
// ============================================================
export const getAllTermsVersions = async (req: Request, res: Response) => {
    try {
        const policies = await TermsConditions.find()
            .sort({ version: -1, updatedAt: -1 })
            .select("title version status publishedAt updatedAt")
            .lean();

        res.json({
            success: true,
            data: policies,
            count: policies.length,
        });
    } catch (error: any) {
        console.error("Error fetching terms versions:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Specific Version
// ============================================================
export const getTermsConditionsVersion = async (req: Request, res: Response) => {
    try {
        const { version } = req.params;

        const policy = await TermsConditions.findOne({ version: parseInt(version) })
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
        console.error("Error fetching terms version:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// POST - Create or Update Terms & Conditions
// ============================================================
export const createOrUpdateTermsConditions = async (req: Request, res: Response) => {
    try {
        const { title, content, status = "draft" } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }

        const existingPolicy = await TermsConditions.findOne().sort({ version: -1 });

        let policy;

        if (existingPolicy) {
            policy = await TermsConditions.findByIdAndUpdate(
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

            await TermsConditions.findByIdAndUpdate(existingPolicy._id, {
                status: "archived",
            });
        } else {
            policy = await TermsConditions.create({
                title: title.trim(),
                content: content,
                status: status,
                version: 1,
                ...(status === "published" ? { publishedAt: new Date() } : {}),
            });
        }

        res.status(201).json({
            success: true,
            message: "Terms & Conditions saved successfully",
            data: policy,
        });
    } catch (error: any) {
        console.error("Error saving terms & conditions:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// PATCH - Publish Terms & Conditions
// ============================================================
export const publishTermsConditions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await TermsConditions.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Terms & Conditions not found",
            });
        }

        const publishedPolicy = await TermsConditions.create({
            title: policy.title,
            content: policy.content,
            status: "published",
            version: policy.version + 1,
            publishedAt: new Date(),
            lastUpdated: new Date(),
            metadata: policy.metadata,
        });

        await TermsConditions.findByIdAndUpdate(id, {
            status: "archived",
        });

        const result = await TermsConditions.findById(publishedPolicy._id).lean();

        res.json({
            success: true,
            message: "Terms & Conditions published successfully",
            data: result,
        });
    } catch (error: any) {
        console.error("Error publishing terms:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// PATCH - Archive Terms & Conditions
// ============================================================
export const archiveTermsConditions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await TermsConditions.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Terms & Conditions not found",
            });
        }

        const archivedPolicy = await TermsConditions.findByIdAndUpdate(
            id,
            {
                status: "archived",
                lastUpdated: new Date(),
            },
            { new: true }
        ).lean();

        res.json({
            success: true,
            message: "Terms & Conditions archived successfully",
            data: archivedPolicy,
        });
    } catch (error: any) {
        console.error("Error archiving terms:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// DELETE - Delete Terms & Conditions
// ============================================================
export const deleteTermsConditions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const policy = await TermsConditions.findById(id);
        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Terms & Conditions not found",
            });
        }

        if (policy.status === "published") {
            const publishedCount = await TermsConditions.countDocuments({
                status: "published",
            });
            if (publishedCount === 1 && policy.status === "published") {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete the only published version. Archive it first.",
                });
            }
        }

        await TermsConditions.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Terms & Conditions deleted successfully",
        });
    } catch (error: any) {
        console.error("Error deleting terms:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};

// ============================================================
// GET - Get Public Terms & Conditions
// ============================================================
export const getPublicTermsConditions = async (req: Request, res: Response) => {
    try {
        const policy = await TermsConditions.findOne({ status: "published" })
            .sort({ version: -1 })
            .select("title content version publishedAt")
            .lean();

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Published Terms & Conditions not found",
            });
        }

        res.json({
            success: true,
            data: policy,
        });
    } catch (error: any) {
        console.error("Error fetching public terms:", error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};