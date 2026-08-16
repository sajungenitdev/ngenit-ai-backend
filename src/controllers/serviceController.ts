import { Request, Response } from 'express';
import { Service } from '../models/Service';

// ============================================================
// GET - Fetch All Services
// ============================================================
export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: services,
        });
    } catch (error: any) {
        console.error('Get Services Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch services',
        });
    }
};

// ============================================================
// GET - Fetch Single Service by ID
// ============================================================
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error: any) {
        console.error('Get Service By ID Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch service',
        });
    }
};

// ============================================================
// POST - Create Service
// ============================================================
export const createService = async (req: Request, res: Response) => {
    try {
        const serviceData = req.body;

        // Validate required fields
        if (!serviceData.name?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Service name is required',
            });
        }
        if (!serviceData.tagline?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Tagline is required',
            });
        }
        if (!serviceData.summary?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Summary is required',
            });
        }
        if (!serviceData.description?.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Description is required',
            });
        }

        const service = await Service.create(serviceData);

        res.status(201).json({
            success: true,
            data: service,
            message: 'Service created successfully',
        });
    } catch (error: any) {
        console.error('Create Service Error:', error);
        
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
            error: error.message || 'Failed to create service',
        });
    }
};

// ============================================================
// PUT - Update Service
// ============================================================
export const updateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const service = await Service.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            data: service,
            message: 'Service updated successfully',
        });
    } catch (error: any) {
        console.error('Update Service Error:', error);
        
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
            error: error.message || 'Failed to update service',
        });
    }
};

// ============================================================
// DELETE - Delete Service
// ============================================================
export const deleteService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Service Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete service',
        });
    }
};

// ============================================================
// PUT - Toggle Service Status
// ============================================================
export const toggleServiceStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const service = await Service.findByIdAndUpdate(
            id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            data: service,
            message: `Service ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Service Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle service status',
        });
    }
};