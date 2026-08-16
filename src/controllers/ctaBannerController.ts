import { Request, Response } from 'express';
import { CtaBanner } from '../models/CtaBanner';

// ============================================================
// GET - Fetch CTA Banner (Single Document)
// ============================================================
export const getCtaBanner = async (req: Request, res: Response) => {
    try {
        let ctaBanner = await CtaBanner.findOne();

        if (!ctaBanner) {
            // Create default if none exists
            ctaBanner = await CtaBanner.create({
                tag: 'Ready to Transform Your Business?',
                title: 'Have an AI Idea or<br />Business Challenge?',
                description: 'Share your requirement with our team. We will review your business challenge and contact you to discuss a practical AI solution.',
                button: {
                    label: 'Send Your Requirement',
                    link: '/contact',
                },
                phone: {
                    number: '8801XXXXXXXXX',
                    label: 'Chat on WhatsApp',
                },
                email: {
                    address: 'ai@ngenitltd.com',
                    label: 'Email Our AI Team',
                },
                isActive: true,
            });
        }

        res.status(200).json({
            success: true,
            data: ctaBanner,
        });
    } catch (error: any) {
        console.error('Get CTA Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch CTA banner',
        });
    }
};

// ============================================================
// PUT - Update CTA Banner (Single Document)
// ============================================================
export const updateCtaBanner = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;

        let ctaBanner = await CtaBanner.findOne();

        if (ctaBanner) {
            const updated = await CtaBanner.findByIdAndUpdate(
                ctaBanner._id,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
            
            res.status(200).json({
                success: true,
                data: updated,
                message: 'CTA Banner updated successfully',
            });
        } else {
            const created = await CtaBanner.create(updateData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'CTA Banner created successfully',
            });
        }
    } catch (error: any) {
        console.error('Update CTA Banner Error:', error);

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
            error: error.message || 'Failed to update CTA banner',
        });
    }
};

// ============================================================
// PUT - Toggle CTA Banner Status
// ============================================================
export const toggleCtaBannerStatus = async (req: Request, res: Response) => {
    try {
        const { isActive } = req.body;

        let ctaBanner = await CtaBanner.findOne();

        if (!ctaBanner) {
            return res.status(404).json({
                success: false,
                error: 'CTA Banner not found',
            });
        }

        const updated = await CtaBanner.findByIdAndUpdate(
            ctaBanner._id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated,
            message: `CTA Banner ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle CTA Banner Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle CTA banner status',
        });
    }
};

// ============================================================
// POST - Reset to Default
// ============================================================
export const resetCtaBanner = async (req: Request, res: Response) => {
    try {
        const defaultData = {
            tag: 'Ready to Transform Your Business?',
            title: 'Have an AI Idea or<br />Business Challenge?',
            description: 'Share your requirement with our team. We will review your business challenge and contact you to discuss a practical AI solution.',
            button: {
                label: 'Send Your Requirement',
                link: '/contact',
            },
            phone: {
                number: '8801XXXXXXXXX',
                label: 'Chat on WhatsApp',
            },
            email: {
                address: 'ai@ngenitltd.com',
                label: 'Email Our AI Team',
            },
            isActive: true,
        };

        let ctaBanner = await CtaBanner.findOne();

        if (ctaBanner) {
            const updated = await CtaBanner.findByIdAndUpdate(
                ctaBanner._id,
                { ...defaultData, updatedAt: new Date() },
                { new: true }
            );
            res.status(200).json({
                success: true,
                data: updated,
                message: 'CTA Banner reset to default successfully',
            });
        } else {
            const created = await CtaBanner.create(defaultData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'CTA Banner created with default values',
            });
        }
    } catch (error: any) {
        console.error('Reset CTA Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to reset CTA banner',
        });
    }
};