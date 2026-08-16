import { Request, Response } from 'express';
import { Industry } from '../models/Industry';

// ============================================================
// GET - Fetch All Industries
// ============================================================
export const getIndustries = async (req: Request, res: Response) => {
    try {
        const industries = await Industry.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            data: industries,
        });
    } catch (error: any) {
        console.error('Get Industries Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch industries',
        });
    }
};

// ============================================================
// GET - Fetch Single Industry by ID or Slug
// ============================================================
export const getIndustryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let industry;

        // Check if id is slug (no numbers) or ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            industry = await Industry.findById(id).select('-__v');
        } else {
            industry = await Industry.findOne({ slug: id }).select('-__v');
        }

        if (!industry) {
            return res.status(404).json({
                success: false,
                error: 'Industry not found',
            });
        }

        res.status(200).json({
            success: true,
            data: industry,
        });
    } catch (error: any) {
        console.error('Get Industry By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch industry',
        });
    }
};

// ============================================================
// POST - Create Industry
// ============================================================
export const createIndustry = async (req: Request, res: Response) => {
    try {
        const industryData = req.body;

        // Validate required fields
        if (!industryData.name?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Industry name is required',
            });
        }
        if (!industryData.short?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Short description is required',
            });
        }
        if (!industryData.long?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Long description is required',
            });
        }

        // Generate slug if not provided
        if (!industryData.slug) {
            industryData.slug = industryData.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }

        const industry = await Industry.create(industryData);

        res.status(201).json({
            success: true,
            data: industry,
            message: 'Industry created successfully',
        });
    } catch (error: any) {
        console.error('Create Industry Error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Industry with this slug already exists',
            });
        }

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
            error: error.message || 'Failed to create industry',
        });
    }
};

// ============================================================
// PUT - Update Industry
// ============================================================
export const updateIndustry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const industry = await Industry.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!industry) {
            return res.status(404).json({
                success: false,
                error: 'Industry not found',
            });
        }

        res.status(200).json({
            success: true,
            data: industry,
            message: 'Industry updated successfully',
        });
    } catch (error: any) {
        console.error('Update Industry Error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Industry with this slug already exists',
            });
        }

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
            error: error.message || 'Failed to update industry',
        });
    }
};

// ============================================================
// DELETE - Delete Industry
// ============================================================
export const deleteIndustry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const industry = await Industry.findByIdAndDelete(id);

        if (!industry) {
            return res.status(404).json({
                success: false,
                error: 'Industry not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Industry deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Industry Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete industry',
        });
    }
};

// ============================================================
// PUT - Toggle Industry Status
// ============================================================
export const toggleIndustryStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const industry = await Industry.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!industry) {
            return res.status(404).json({
                success: false,
                error: 'Industry not found',
            });
        }

        res.status(200).json({
            success: true,
            data: industry,
            message: `Industry ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Industry Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle industry status',
        });
    }
};