import { Request, Response } from 'express';
import { Insight } from '../models/Insight';

// ============================================================
// GET - Fetch all insights
// ============================================================
export const getInsights = async (req: Request, res: Response) => {
    try {
        const { category, search, active } = req.query;
        
        let filter: any = {};
        
        if (category && category !== 'all') {
            filter.cat = category;
        }
        
        if (active === 'true') {
            filter.isActive = true;
        }
        
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }
        
        const insights = await Insight.find(filter)
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: insights,
        });
    } catch (error: any) {
        console.error('Get Insights Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch insights',
        });
    }
};

// ============================================================
// GET - Fetch single insight
// ============================================================
export const getInsightById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const insight = await Insight.findById(id);

        if (!insight) {
            return res.status(404).json({
                success: false,
                error: 'Insight not found',
            });
        }

        res.status(200).json({
            success: true,
            data: insight,
        });
    } catch (error: any) {
        console.error('Get Insight By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch insight',
        });
    }
};

// ============================================================
// POST - Create insight
// ============================================================
export const createInsight = async (req: Request, res: Response) => {
    try {
        const insightData = req.body;

        // Validate required fields
        if (!insightData.title?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Title is required',
            });
        }
        if (!insightData.cat?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Category is required',
            });
        }
        if (!insightData.excerpt?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Excerpt is required',
            });
        }
        if (!insightData.content?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Content is required',
            });
        }

        // Auto-generate read time if not provided
        if (!insightData.read) {
            const wordCount = insightData.content.split(/\s+/).length;
            const readTime = Math.max(1, Math.round(wordCount / 200));
            insightData.read = `${readTime} min read`;
        }

        const insight = await Insight.create(insightData);

        res.status(201).json({
            success: true,
            data: insight,
            message: 'Insight created successfully',
        });
    } catch (error: any) {
        console.error('Create Insight Error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((e: any) => e.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create insight',
        });
    }
};

// ============================================================
// PUT - Update insight
// ============================================================
export const updateInsight = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Auto-generate read time if content updated
        if (updateData.content) {
            const wordCount = updateData.content.split(/\s+/).length;
            const readTime = Math.max(1, Math.round(wordCount / 200));
            updateData.read = `${readTime} min read`;
        }

        const insight = await Insight.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!insight) {
            return res.status(404).json({
                success: false,
                error: 'Insight not found',
            });
        }

        res.status(200).json({
            success: true,
            data: insight,
            message: 'Insight updated successfully',
        });
    } catch (error: any) {
        console.error('Update Insight Error:', error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((e: any) => e.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to update insight',
        });
    }
};

// ============================================================
// DELETE - Delete insight
// ============================================================
export const deleteInsight = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const insight = await Insight.findByIdAndDelete(id);

        if (!insight) {
            return res.status(404).json({
                success: false,
                error: 'Insight not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Insight deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Insight Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete insight',
        });
    }
};

// ============================================================
// PUT - Toggle insight status
// ============================================================
export const toggleInsightStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const insight = await Insight.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!insight) {
            return res.status(404).json({
                success: false,
                error: 'Insight not found',
            });
        }

        res.status(200).json({
            success: true,
            data: insight,
            message: `Insight ${isActive ? 'published' : 'unpublished'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Insight Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle insight status',
        });
    }
};

// ============================================================
// GET - Get categories
// ============================================================
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Insight.distinct('cat');
        
        res.status(200).json({
            success: true,
            data: categories.sort(),
        });
    } catch (error: any) {
        console.error('Get Categories Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch categories',
        });
    }
};