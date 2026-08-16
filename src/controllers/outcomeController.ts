import { Request, Response } from 'express';
import { Outcome } from '../models/Outcome';

// ============================================================
// GET - Fetch All Outcomes
// ============================================================
export const getOutcomes = async (req: Request, res: Response) => {
    try {
        const outcomes = await Outcome.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            data: outcomes,
        });
    } catch (error: any) {
        console.error('Get Outcomes Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch outcomes',
        });
    }
};

// ============================================================
// GET - Fetch Single Outcome
// ============================================================
export const getOutcomeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const outcome = await Outcome.findById(id).select('-__v');

        if (!outcome) {
            return res.status(404).json({
                success: false,
                error: 'Outcome not found',
            });
        }

        res.status(200).json({
            success: true,
            data: outcome,
        });
    } catch (error: any) {
        console.error('Get Outcome By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch outcome',
        });
    }
};

// ============================================================
// POST - Create Outcome
// ============================================================
export const createOutcome = async (req: Request, res: Response) => {
    try {
        const outcomeData = req.body;

        // Validate required fields
        if (!outcomeData.icon?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Icon is required',
            });
        }
        if (!outcomeData.title?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Title is required',
            });
        }
        if (!outcomeData.description?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Description is required',
            });
        }
        if (!outcomeData.stat?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Stat is required',
            });
        }

        const outcome = await Outcome.create(outcomeData);

        res.status(201).json({
            success: true,
            data: outcome,
            message: 'Outcome created successfully',
        });
    } catch (error: any) {
        console.error('Create Outcome Error:', error);

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
            error: error.message || 'Failed to create outcome',
        });
    }
};

// ============================================================
// PUT - Update Outcome
// ============================================================
export const updateOutcome = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const outcome = await Outcome.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!outcome) {
            return res.status(404).json({
                success: false,
                error: 'Outcome not found',
            });
        }

        res.status(200).json({
            success: true,
            data: outcome,
            message: 'Outcome updated successfully',
        });
    } catch (error: any) {
        console.error('Update Outcome Error:', error);

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
            error: error.message || 'Failed to update outcome',
        });
    }
};

// ============================================================
// DELETE - Delete Outcome
// ============================================================
export const deleteOutcome = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const outcome = await Outcome.findByIdAndDelete(id);

        if (!outcome) {
            return res.status(404).json({
                success: false,
                error: 'Outcome not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Outcome deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Outcome Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete outcome',
        });
    }
};

// ============================================================
// PUT - Toggle Outcome Status
// ============================================================
export const toggleOutcomeStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const outcome = await Outcome.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!outcome) {
            return res.status(404).json({
                success: false,
                error: 'Outcome not found',
            });
        }

        res.status(200).json({
            success: true,
            data: outcome,
            message: `Outcome ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Outcome Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle outcome status',
        });
    }
};