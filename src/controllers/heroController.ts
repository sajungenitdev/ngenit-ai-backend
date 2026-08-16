import { Request, Response } from 'express';
import { HeroBanner } from '../models/HeroBanner';

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

export const createHeroBanner = async (req: Request, res: Response) => {
    try {
        const existing = await HeroBanner.findOne();
        if (existing) {
            return res.status(400).json({
                success: false,
                error: 'Hero banner already exists. Use PUT to update.',
            });
        }

        const hero = await HeroBanner.create(req.body);

        res.status(201).json({
            success: true,
            data: hero,
            message: 'Hero banner created successfully',
        });
    } catch (error: any) {
        console.error('Create Hero Banner Error:', error);
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

export const updateHeroBanner = async (req: Request, res: Response) => {
    try {
        let hero = await HeroBanner.findOne();

        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found. Please create one first.',
            });
        }

        const updated = await HeroBanner.findByIdAndUpdate(
            hero._id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
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

export const resetHeroBanner = async (req: Request, res: Response) => {
    try {
        const defaultData = {
            badge: '🚀 Practical AI for Business & Industry',
            title: 'Practical AI Solutions for',
            highlightedText: 'Business and Industry',
            subtitle: 'We help organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.',
            buttonPrimary: 'Book an AI Consultation',
            buttonPrimaryLink: '/contact',
            buttonSecondary: 'Explore AI Services',
            buttonSecondaryLink: '/services',
            stats: {
                years: { value: '16+', label: 'Years of Experience' },
                markets: { value: '5', label: 'International Markets' },
                partners: { value: '200+', label: 'Business Partners' },
                clients: { value: '50+', label: 'Enterprise Clients' },
            },
            dashboard: {
                title: 'NGEN IT AI Platform',
                services: [
                    { icon: '🧠', name: 'AI Consulting', tag: 'Strategy →' },
                    { icon: '✨', name: 'Generative AI', tag: 'Deploy →' },
                    { icon: '⚡', name: 'Automation', tag: 'Live →' },
                    { icon: '📊', name: 'Analytics', tag: 'Insights →' },
                ],
                metrics: [
                    { value: '40%', label: 'Cost Reduction', trend: '↑ Avg. Result' },
                    { value: '3x', label: 'Faster Decisions', trend: '↑ Reported' },
                    { value: '98%', label: 'Client Satisfaction', trend: '↑ Ongoing' },
                ],
            },
            floatingCards: {
                left: 'AI Automation Active',
                right: 'New Enquiry Received',
            },
            isActive: true,
        };

        let hero = await HeroBanner.findOne();

        if (hero) {
            const updated = await HeroBanner.findByIdAndUpdate(
                hero._id,
                { ...defaultData, updatedAt: new Date() },
                { new: true }
            );
            res.status(200).json({
                success: true,
                data: updated,
                message: 'Hero banner reset to default successfully',
            });
        } else {
            const created = await HeroBanner.create(defaultData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'Hero banner created with default values',
            });
        }
    } catch (error: any) {
        console.error('Reset Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to reset hero banner',
        });
    }
};

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