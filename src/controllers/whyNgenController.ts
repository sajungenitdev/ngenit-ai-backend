import { Request, Response } from 'express';
import { WhyNgen } from '../models/WhyNgen';

// ============================================================
// GET - Fetch Why NGEN (Single Document)
// ============================================================
export const getWhyNgen = async (req: Request, res: Response) => {
    try {
        let whyNgen = await WhyNgen.findOne();

        if (!whyNgen) {
            // Create default if none exists
            whyNgen = await WhyNgen.create({
                tag: 'Why NGEN IT',
                title: 'Your Trusted AI Partner<br />from Strategy to Deployment',
                description: 'We combine deep business consulting experience with technical AI expertise and local deployment capability — serving enterprise, government and industrial organizations across multiple markets.',
                button: {
                    label: 'Discuss Your Requirement',
                    link: '/contact',
                },
                features: [
                    {
                        icon: '🏢',
                        title: 'Since 2009',
                        description: 'Established technology company with enterprise and government track record',
                    },
                    {
                        icon: '🌍',
                        title: 'International Presence',
                        description: 'Operating across Bangladesh, UK, Singapore, Portugal and the Middle East',
                    },
                    {
                        icon: '🤝',
                        title: 'Local Deployment',
                        description: 'Local teams for implementation, training and ongoing support',
                    },
                    {
                        icon: '🔒',
                        title: 'Secure & Responsible AI',
                        description: 'Data privacy, governance and responsible AI built into every solution',
                    },
                ],
                isActive: true,
            });
        }

        res.status(200).json({
            success: true,
            data: whyNgen,
        });
    } catch (error: any) {
        console.error('Get Why Ngen Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch why ngen',
        });
    }
};

// ============================================================
// PUT - Update Why NGEN (Single Document)
// ============================================================
export const updateWhyNgen = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;

        let whyNgen = await WhyNgen.findOne();

        if (whyNgen) {
            const updated = await WhyNgen.findByIdAndUpdate(
                whyNgen._id,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
            
            res.status(200).json({
                success: true,
                data: updated,
                message: 'Why NGEN updated successfully',
            });
        } else {
            const created = await WhyNgen.create(updateData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'Why NGEN created successfully',
            });
        }
    } catch (error: any) {
        console.error('Update Why Ngen Error:', error);

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
            error: error.message || 'Failed to update why ngen',
        });
    }
};

// ============================================================
// PUT - Toggle Why NGEN Status
// ============================================================
export const toggleWhyNgenStatus = async (req: Request, res: Response) => {
    try {
        const { isActive } = req.body;

        let whyNgen = await WhyNgen.findOne();

        if (!whyNgen) {
            return res.status(404).json({
                success: false,
                error: 'Why NGEN not found',
            });
        }

        const updated = await WhyNgen.findByIdAndUpdate(
            whyNgen._id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated,
            message: `Why NGEN ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle Why Ngen Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle why ngen status',
        });
    }
};

// ============================================================
// POST - Reset to Default
// ============================================================
export const resetWhyNgen = async (req: Request, res: Response) => {
    try {
        const defaultData = {
            tag: 'Why NGEN IT',
            title: 'Your Trusted AI Partner<br />from Strategy to Deployment',
            description: 'We combine deep business consulting experience with technical AI expertise and local deployment capability — serving enterprise, government and industrial organizations across multiple markets.',
            button: {
                label: 'Discuss Your Requirement',
                link: '/contact',
            },
            features: [
                {
                    icon: '🏢',
                    title: 'Since 2009',
                    description: 'Established technology company with enterprise and government track record',
                },
                {
                    icon: '🌍',
                    title: 'International Presence',
                    description: 'Operating across Bangladesh, UK, Singapore, Portugal and the Middle East',
                },
                {
                    icon: '🤝',
                    title: 'Local Deployment',
                    description: 'Local teams for implementation, training and ongoing support',
                },
                {
                    icon: '🔒',
                    title: 'Secure & Responsible AI',
                    description: 'Data privacy, governance and responsible AI built into every solution',
                },
            ],
            isActive: true,
        };

        let whyNgen = await WhyNgen.findOne();

        if (whyNgen) {
            const updated = await WhyNgen.findByIdAndUpdate(
                whyNgen._id,
                { ...defaultData, updatedAt: new Date() },
                { new: true }
            );
            res.status(200).json({
                success: true,
                data: updated,
                message: 'Why NGEN reset to default successfully',
            });
        } else {
            const created = await WhyNgen.create(defaultData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'Why NGEN created with default values',
            });
        }
    } catch (error: any) {
        console.error('Reset Why Ngen Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to reset why ngen',
        });
    }
};