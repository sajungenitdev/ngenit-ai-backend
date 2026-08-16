import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    icon: string;
    name: string;
    tagline: string;
    summary: string;
    description: string;
    capabilities: string[];
    benefits: {
        label: string;
        description: string;
    }[];
    useCases: string[];
    ctaButtons: {
        primary: { label: string; link: string };
        secondary: { label: string; link: string };
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
    {
        icon: {
            type: String,
            required: true,
            default: '🧠',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        tagline: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        capabilities: {
            type: [String],
            required: true,
            default: [],
        },
        benefits: [
            {
                label: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        useCases: {
            type: [String],
            required: true,
            default: [],
        },
        ctaButtons: {
            primary: {
                label: { type: String, required: true, default: 'Book a Free Consultation' },
                link: { type: String, required: true, default: '/contact' },
            },
            secondary: {
                label: { type: String, required: true, default: '💬 WhatsApp Us' },
                link: { type: String, required: true, default: 'https://wa.me/8801XXXXXXXXX' },
            },
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

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);