import mongoose, { Schema, Document } from 'mongoose';

export interface IMilestone {
    year: string;
    title: string;
    description: string;
}

export interface IValue {
    icon: string;
    title: string;
    description: string;
}

export interface IOffice {
    flag: string;
    city: string;
    country: string;
    description: string;
}

export interface IAboutPage extends Document {
    heroTitle: string;
    heroDescription: string;
    storyTitle: string;
    storyDescription: string;
    milestones: IMilestone[];
    values: IValue[];
    offices: IOffice[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    ctaLink: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MilestoneSchema = new Schema<IMilestone>({
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const ValueSchema = new Schema<IValue>({
    icon: { type: String, required: true, default: '🎯' },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const OfficeSchema = new Schema<IOffice>({
    flag: { type: String, required: true, default: '🇧🇩' },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
});

const AboutPageSchema = new Schema<IAboutPage>(
    {
        heroTitle: {
            type: String,
            required: true,
            default: 'Practical AI, Delivered by a Trusted Systems Integrator',
        },
        heroDescription: {
            type: String,
            required: true,
            default: 'NGEN IT is a systems integration, licensed software and IoT solutions company headquartered in Dhaka, Bangladesh, with entities and partners across Singapore, the UK, Portugal, the UAE and Southeast Asia.',
        },
        storyTitle: {
            type: String,
            required: true,
            default: 'From Systems Integration to AI Solutions',
        },
        storyDescription: {
            type: String,
            required: true,
            default: 'Since 2009, NGEN IT has helped enterprise, government and industrial organizations select, implement and support technology — from licensed software and industrial hardware to IoT and smart automation.\n\nOur AI Services division builds on that foundation, combining hands-on delivery experience with modern AI capability to help clients move from AI ideas to measurable operational results.',
        },
        milestones: {
            type: [MilestoneSchema],
            required: true,
            default: [
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
        },
        values: {
            type: [ValueSchema],
            required: true,
            default: [
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
        },
        offices: {
            type: [OfficeSchema],
            required: true,
            default: [
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
        },
        ctaTitle: {
            type: String,
            required: true,
            default: 'Want to Work with Us?',
        },
        ctaDescription: {
            type: String,
            required: true,
            default: 'Tell us about your organization and AI goals — we would love to talk.',
        },
        ctaButton: {
            type: String,
            required: true,
            default: 'Get in Touch',
        },
        ctaLink: {
            type: String,
            required: true,
            default: '/contact',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const AboutPage = mongoose.models.AboutPage || mongoose.model<IAboutPage>('AboutPage', AboutPageSchema);