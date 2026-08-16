import { Request, Response } from 'express';
import { UseCase } from '../models/UseCase';

// ============================================================
// GET - Fetch All Use Cases
// ============================================================
export const getUseCases = async (req: Request, res: Response) => {
    try {
        const useCases = await UseCase.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            data: useCases,
        });
    } catch (error: any) {
        console.error('Get Use Cases Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch use cases',
        });
    }
};

// ============================================================
// GET - Fetch Single Use Case
// ============================================================
export const getUseCaseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const useCase = await UseCase.findById(id).select('-__v');

        if (!useCase) {
            return res.status(404).json({
                success: false,
                error: 'Use case not found',
            });
        }

        res.status(200).json({
            success: true,
            data: useCase,
        });
    } catch (error: any) {
        console.error('Get Use Case By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch use case',
        });
    }
};

// ============================================================
// POST - Create Use Case
// ============================================================
export const createUseCase = async (req: Request, res: Response) => {
    try {
        const useCaseData = req.body;

        // Validate required fields
        if (!useCaseData.name?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Use case name is required',
            });
        }
        if (!useCaseData.industry?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Industry is required',
            });
        }
        if (!useCaseData.service?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Service is required',
            });
        }
        if (!useCaseData.desc?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Description is required',
            });
        }
        if (!useCaseData.result?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Result is required',
            });
        }

        const useCase = await UseCase.create(useCaseData);

        res.status(201).json({
            success: true,
            data: useCase,
            message: 'Use case created successfully',
        });
    } catch (error: any) {
        console.error('Create Use Case Error:', error);

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
            error: error.message || 'Failed to create use case',
        });
    }
};

// ============================================================
// PUT - Update Use Case
// ============================================================
export const updateUseCase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const useCase = await UseCase.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!useCase) {
            return res.status(404).json({
                success: false,
                error: 'Use case not found',
            });
        }

        res.status(200).json({
            success: true,
            data: useCase,
            message: 'Use case updated successfully',
        });
    } catch (error: any) {
        console.error('Update Use Case Error:', error);

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
            error: error.message || 'Failed to update use case',
        });
    }
};

// ============================================================
// DELETE - Delete Use Case
// ============================================================
export const deleteUseCase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const useCase = await UseCase.findByIdAndDelete(id);

        if (!useCase) {
            return res.status(404).json({
                success: false,
                error: 'Use case not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Use case deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Use Case Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete use case',
        });
    }
};

// ============================================================
// PUT - Toggle Use Case Status
// ============================================================
export const toggleUseCaseStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const useCase = await UseCase.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!useCase) {
            return res.status(404).json({
                success: false,
                error: 'Use case not found',
            });
        }

        res.status(200).json({
            success: true,
            data: useCase,
            message: `Use case ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Use Case Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle use case status',
        });
    }
};