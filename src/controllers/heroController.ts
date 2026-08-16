import { Request, Response } from 'express';
import { HeroBanner } from '../models/HeroBanner';

// ============================================================
// GET - Fetch Hero Banner
// ============================================================
export const getHeroBanner = async (req: Request, res: Response) => {
    try {
        let hero = await HeroBanner.findOne();

        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found. Please create one first.',
            });
        }

        res.status(200).json({
            success: true,
            data: hero,
        });
    } catch (error: any) {
        console.error('Get Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch hero banner',
        });
    }
};

// ============================================================
// POST - Create Hero Banner (First Time)
// ============================================================
export const createHeroBanner = async (req: Request, res: Response) => {
    try {
        // Check if hero already exists
        const existing = await HeroBanner.findOne();
        if (existing) {
            return res.status(400).json({
                success: false,
                error: 'Hero banner already exists. Use PUT to update.',
            });
        }

        const heroData = req.body;
        const hero = await HeroBanner.create(heroData);

        res.status(201).json({
            success: true,
            data: hero,
            message: 'Hero banner created successfully',
        });
    } catch (error: any) {
        console.error('Create Hero Banner Error:', error);
        
        // Validation error
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
            error: error.message || 'Failed to create hero banner',
        });
    }
};

// ============================================================
// PUT - Update Hero Banner (Full Update)
// ============================================================
export const updateHeroBanner = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;

        // Find existing hero
        let hero = await HeroBanner.findOne();

        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found. Please create one first.',
            });
        }

        // Update all fields
        const updated = await HeroBanner.findByIdAndUpdate(
            hero._id,
            { 
                ...updateData, 
                updatedAt: new Date() 
            },
            { 
                new: true, 
                runValidators: true 
            }
        );

        res.status(200).json({
            success: true,
            data: updated,
            message: 'Hero banner updated successfully',
        });
    } catch (error: any) {
        console.error('Update Hero Banner Error:', error);
        
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
            error: error.message || 'Failed to update hero banner',
        });
    }
};

// ============================================================
// PUT - Partial Update (Status Toggle)
// ============================================================
export const toggleHeroBannerStatus = async (req: Request, res: Response) => {
    try {
        const { isActive } = req.body;

        let hero = await HeroBanner.findOne();

        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found',
            });
        }

        const updated = await HeroBanner.findByIdAndUpdate(
            hero._id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated,
            message: `Hero banner ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle hero banner status',
        });
    }
};

// ============================================================
// DELETE - Delete Hero Banner (Optional)
// ============================================================
export const deleteHeroBanner = async (req: Request, res: Response) => {
    try {
        const hero = await HeroBanner.findOne();
        
        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found',
            });
        }

        await HeroBanner.findByIdAndDelete(hero._id);

        res.status(200).json({
            success: true,
            message: 'Hero banner deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete hero banner',
        });
    }
};