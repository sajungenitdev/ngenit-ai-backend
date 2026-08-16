import { Request, Response } from 'express';
import { Solution } from '../models/Solution';

export const getSolutions = async (req: Request, res: Response) => {
    try {
        const solutions = await Solution.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            data: solutions,
        });
    } catch (error: any) {
        console.error('Get Solutions Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch solutions',
        });
    }
};

export const getSolutionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const solution = await Solution.findById(id).select('-__v');

        if (!solution) {
            return res.status(404).json({
                success: false,
                error: 'Solution not found',
            });
        }

        res.status(200).json({
            success: true,
            data: solution,
        });
    } catch (error: any) {
        console.error('Get Solution By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch solution',
        });
    }
};

export const createSolution = async (req: Request, res: Response) => {
    try {
        const solutionData = req.body;

        if (!solutionData.tag?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Tag is required',
            });
        }
        if (!solutionData.name?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Name is required',
            });
        }
        if (!solutionData.desc?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Description is required',
            });
        }
        if (!solutionData.footer?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Footer is required',
            });
        }

        const solution = await Solution.create(solutionData);

        res.status(201).json({
            success: true,
            data: solution,
            message: 'Solution created successfully',
        });
    } catch (error: any) {
        console.error('Create Solution Error:', error);

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
            error: error.message || 'Failed to create solution',
        });
    }
};

export const updateSolution = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const solution = await Solution.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!solution) {
            return res.status(404).json({
                success: false,
                error: 'Solution not found',
            });
        }

        res.status(200).json({
            success: true,
            data: solution,
            message: 'Solution updated successfully',
        });
    } catch (error: any) {
        console.error('Update Solution Error:', error);

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
            error: error.message || 'Failed to update solution',
        });
    }
};

export const deleteSolution = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const solution = await Solution.findByIdAndDelete(id);

        if (!solution) {
            return res.status(404).json({
                success: false,
                error: 'Solution not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Solution deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Solution Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete solution',
        });
    }
};

export const toggleSolutionStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const solution = await Solution.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!solution) {
            return res.status(404).json({
                success: false,
                error: 'Solution not found',
            });
        }

        res.status(200).json({
            success: true,
            data: solution,
            message: `Solution ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Solution Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle solution status',
        });
    }
};