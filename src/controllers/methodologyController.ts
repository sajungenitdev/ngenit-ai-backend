import { Request, Response } from 'express';
import { Methodology } from '../models/Methodology';

// ============================================================
// GET - Fetch All Methodology Steps
// ============================================================
export const getMethodology = async (req: Request, res: Response) => {
    try {
        const steps = await Methodology.find()
            .sort({ number: 1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            data: steps,
        });
    } catch (error: any) {
        console.error('Get Methodology Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch methodology',
        });
    }
};

// ============================================================
// GET - Fetch Single Methodology Step
// ============================================================
export const getMethodologyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const step = await Methodology.findById(id).select('-__v');

        if (!step) {
            return res.status(404).json({
                success: false,
                error: 'Methodology step not found',
            });
        }

        res.status(200).json({
            success: true,
            data: step,
        });
    } catch (error: any) {
        console.error('Get Methodology By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch methodology step',
        });
    }
};

// ============================================================
// POST - Create Methodology Step
// ============================================================
export const createMethodologyStep = async (req: Request, res: Response) => {
    try {
        const stepData = req.body;

        // Validate required fields
        if (!stepData.number) {
            return res.status(400).json({
                success: false,
                error: 'Step number is required',
            });
        }
        if (!stepData.icon?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Icon is required',
            });
        }
        if (!stepData.title?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Title is required',
            });
        }
        if (!stepData.description?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Description is required',
            });
        }

        const step = await Methodology.create(stepData);

        res.status(201).json({
            success: true,
            data: step,
            message: 'Methodology step created successfully',
        });
    } catch (error: any) {
        console.error('Create Methodology Step Error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Step number already exists',
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
            error: error.message || 'Failed to create methodology step',
        });
    }
};

// ============================================================
// PUT - Update Methodology Step
// ============================================================
export const updateMethodologyStep = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const step = await Methodology.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!step) {
            return res.status(404).json({
                success: false,
                error: 'Methodology step not found',
            });
        }

        res.status(200).json({
            success: true,
            data: step,
            message: 'Methodology step updated successfully',
        });
    } catch (error: any) {
        console.error('Update Methodology Step Error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Step number already exists',
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
            error: error.message || 'Failed to update methodology step',
        });
    }
};

// ============================================================
// DELETE - Delete Methodology Step
// ============================================================
export const deleteMethodologyStep = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const step = await Methodology.findByIdAndDelete(id);

        if (!step) {
            return res.status(404).json({
                success: false,
                error: 'Methodology step not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Methodology step deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Methodology Step Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete methodology step',
        });
    }
};

// ============================================================
// PUT - Toggle Methodology Step Status
// ============================================================
export const toggleMethodologyStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const step = await Methodology.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!step) {
            return res.status(404).json({
                success: false,
                error: 'Methodology step not found',
            });
        }

        res.status(200).json({
            success: true,
            data: step,
            message: `Methodology step ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Methodology Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle methodology status',
        });
    }
};