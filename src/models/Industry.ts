import mongoose, { Schema, Document } from 'mongoose';

export interface IIndustry extends Document {
    icon: string;
    name: string;
    slug: string;
    short: string;
    long: string;
    challenges: string[];
    solutions: {
        title: string;
        description: string;
    }[];
    focusAreas: string[];
    ctaText: string;
    ctaButtons: {
        primary: { label: string; link: string };
        secondary: { label: string; link: string };
    };
    metaTitle?: string;
    metaDescription?: string;
    featuredImage?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>(
    {
        icon: { type: String, required: true, default: '🏭' },
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
        short: { type: String, required: true, trim: true },
        long: { type: String, required: true },
        challenges: { type: [String], required: true, default: [] },
        solutions: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        focusAreas: { type: [String], required: true, default: [] },
        ctaText: { type: String, required: true, default: 'Ready to Transform Your Operations?' },
        ctaButtons: {
            primary: {
                label: { type: String, default: 'Discuss AI Solutions' },
                link: { type: String, default: '/contact' },
            },
            secondary: {
                label: { type: String, default: '💬 WhatsApp Us' },
                link: { type: String, default: 'https://wa.me/8801XXXXXXXXX' },
            },
        },
        metaTitle: { type: String },
        metaDescription: { type: String },
        featuredImage: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Industry = mongoose.models.Industry || mongoose.model<IIndustry>('Industry', IndustrySchema);