import { Request, Response } from 'express';
import { AboutPage } from '../models/AboutPage';

// ============================================================
// GET - Fetch About Page (Single Document)
// ============================================================
export const getAboutPage = async (req: Request, res: Response) => {
    try {
        let aboutPage = await AboutPage.findOne();

        if (!aboutPage) {
            // Create default if none exists
            aboutPage = await AboutPage.create({
                heroTitle: 'Practical AI, Delivered by a Trusted Systems Integrator',
                heroDescription: 'NGEN IT is a systems integration, licensed software and IoT solutions company headquartered in Dhaka, Bangladesh, with entities and partners across Singapore, the UK, Portugal, the UAE and Southeast Asia.',
                storyTitle: 'From Systems Integration to AI Solutions',
                storyDescription: 'Since 2009, NGEN IT has helped enterprise, government and industrial organizations select, implement and support technology — from licensed software and industrial hardware to IoT and smart automation.\n\nOur AI Services division builds on that foundation, combining hands-on delivery experience with modern AI capability to help clients move from AI ideas to measurable operational results.',
                milestones: [
                    {
                        year: '2009',
                        title: 'NGEN IT Founded',
                        description: 'Established in Dhaka as a systems integration and licensed software company serving enterprise and government clients.',
                    },
                    {
                        year: '2015',
                        title: 'Regional Expansion',
                        description: 'Expanded delivery capability across industrial hardware supply, government tendering and enterprise software distribution.',
                    },
                    {
                        year: '2021',
                        title: 'IoT & Smart Automation',
                        description: 'Launched IoT and smart-automation product lines for industrial and utility clients.',
                    },
                    {
                        year: '2024',
                        title: 'International Entities',
                        description: 'Established entities and partnerships in Singapore, UK and Portugal to serve international clients.',
                    },
                    {
                        year: '2026',
                        title: 'AI Services Division',
                        description: 'Launched a dedicated AI Services division covering consulting, generative AI, automation, analytics, computer vision and industrial AI.',
                    },
                ],
                values: [
                    {
                        icon: '🎯',
                        title: 'Practical, Not Hype',
                        description: 'We focus on measurable business outcomes over trend-chasing.',
                    },
                    {
                        icon: '🤝',
                        title: 'Client Partnership',
                        description: 'Long-term relationships built on delivery, not just proposals.',
                    },
                    {
                        icon: '🔒',
                        title: 'Responsible AI',
                        description: 'Governance, privacy and security built into every engagement.',
                    },
                    {
                        icon: '🌍',
                        title: 'Local + Global',
                        description: 'International technology standards with local deployment capability.',
                    },
                ],
                offices: [
                    {
                        flag: '🇧🇩',
                        city: 'Dhaka',
                        country: 'Bangladesh',
                        description: 'Head office — sales, engineering and delivery teams',
                    },
                    {
                        flag: '🇬🇧',
                        city: 'London',
                        country: 'UK',
                        description: 'Market development and enterprise partnerships',
                    },
                    {
                        flag: '🇸🇬',
                        city: 'Singapore',
                        country: 'Singapore',
                        description: 'Regional entity for Southeast Asia operations',
                    },
                    {
                        flag: '🇵🇹',
                        city: 'Lisbon',
                        country: 'Portugal',
                        description: 'EU market development and digital services',
                    },
                ],
                ctaTitle: 'Want to Work with Us?',
                ctaDescription: 'Tell us about your organization and AI goals — we would love to talk.',
                ctaButton: 'Get in Touch',
                ctaLink: '/contact',
                isActive: true,
            });
        }

        res.status(200).json({
            success: true,
            data: aboutPage,
        });
    } catch (error: any) {
        console.error('Get About Page Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch about page',
        });
    }
};

// ============================================================
// PUT - Update About Page (Single Document)
// ============================================================
export const updateAboutPage = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;

        let aboutPage = await AboutPage.findOne();

        if (aboutPage) {
            const updated = await AboutPage.findByIdAndUpdate(
                aboutPage._id,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
            
            res.status(200).json({
                success: true,
                data: updated,
                message: 'About page updated successfully',
            });
        } else {
            const created = await AboutPage.create(updateData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'About page created successfully',
            });
        }
    } catch (error: any) {
        console.error('Update About Page Error:', error);

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
            error: error.message || 'Failed to update about page',
        });
    }
};

// ============================================================
// PUT - Toggle About Page Status
// ============================================================
export const toggleAboutPageStatus = async (req: Request, res: Response) => {
    try {
        const { isActive } = req.body;

        let aboutPage = await AboutPage.findOne();

        if (!aboutPage) {
            return res.status(404).json({
                success: false,
                error: 'About page not found',
            });
        }

        const updated = await AboutPage.findByIdAndUpdate(
            aboutPage._id,
            { isActive, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updated,
            message: `About page ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    } catch (error: any) {
        console.error('Toggle About Page Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle about page status',
        });
    }
};

// ============================================================
// POST - Reset to Default
// ============================================================
export const resetAboutPage = async (req: Request, res: Response) => {
    try {
        const defaultData = {
            heroTitle: 'Practical AI, Delivered by a Trusted Systems Integrator',
            heroDescription: 'NGEN IT is a systems integration, licensed software and IoT solutions company headquartered in Dhaka, Bangladesh, with entities and partners across Singapore, the UK, Portugal, the UAE and Southeast Asia.',
            storyTitle: 'From Systems Integration to AI Solutions',
            storyDescription: 'Since 2009, NGEN IT has helped enterprise, government and industrial organizations select, implement and support technology — from licensed software and industrial hardware to IoT and smart automation.\n\nOur AI Services division builds on that foundation, combining hands-on delivery experience with modern AI capability to help clients move from AI ideas to measurable operational results.',
            milestones: [
                {
                    year: '2009',
                    title: 'NGEN IT Founded',
                    description: 'Established in Dhaka as a systems integration and licensed software company serving enterprise and government clients.',
                },
                {
                    year: '2015',
                    title: 'Regional Expansion',
                    description: 'Expanded delivery capability across industrial hardware supply, government tendering and enterprise software distribution.',
                },
                {
                    year: '2021',
                    title: 'IoT & Smart Automation',
                    description: 'Launched IoT and smart-automation product lines for industrial and utility clients.',
                },
                {
                    year: '2024',
                    title: 'International Entities',
                    description: 'Established entities and partnerships in Singapore, UK and Portugal to serve international clients.',
                },
                {
                    year: '2026',
                    title: 'AI Services Division',
                    description: 'Launched a dedicated AI Services division covering consulting, generative AI, automation, analytics, computer vision and industrial AI.',
                },
            ],
            values: [
                {
                    icon: '🎯',
                    title: 'Practical, Not Hype',
                    description: 'We focus on measurable business outcomes over trend-chasing.',
                },
                {
                    icon: '🤝',
                    title: 'Client Partnership',
                    description: 'Long-term relationships built on delivery, not just proposals.',
                },
                {
                    icon: '🔒',
                    title: 'Responsible AI',
                    description: 'Governance, privacy and security built into every engagement.',
                },
                {
                    icon: '🌍',
                    title: 'Local + Global',
                    description: 'International technology standards with local deployment capability.',
                },
            ],
            offices: [
                {
                    flag: '🇧🇩',
                    city: 'Dhaka',
                    country: 'Bangladesh',
                    description: 'Head office — sales, engineering and delivery teams',
                },
                {
                    flag: '🇬🇧',
                    city: 'London',
                    country: 'UK',
                    description: 'Market development and enterprise partnerships',
                },
                {
                    flag: '🇸🇬',
                    city: 'Singapore',
                    country: 'Singapore',
                    description: 'Regional entity for Southeast Asia operations',
                },
                {
                    flag: '🇵🇹',
                    city: 'Lisbon',
                    country: 'Portugal',
                    description: 'EU market development and digital services',
                },
            ],
            ctaTitle: 'Want to Work with Us?',
            ctaDescription: 'Tell us about your organization and AI goals — we would love to talk.',
            ctaButton: 'Get in Touch',
            ctaLink: '/contact',
            isActive: true,
        };

        let aboutPage = await AboutPage.findOne();

        if (aboutPage) {
            const updated = await AboutPage.findByIdAndUpdate(
                aboutPage._id,
                { ...defaultData, updatedAt: new Date() },
                { new: true }
            );
            res.status(200).json({
                success: true,
                data: updated,
                message: 'About page reset to default successfully',
            });
        } else {
            const created = await AboutPage.create(defaultData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'About page created with default values',
            });
        }
    } catch (error: any) {
        console.error('Reset About Page Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to reset about page',
        });
    }
};