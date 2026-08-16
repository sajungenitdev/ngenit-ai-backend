import mongoose, { Schema, Document } from 'mongoose';

export interface ICtaBanner extends Document {
    tag: string;
    title: string;
    description: string;
    button: {
        label: string;
        link: string;
    };
    phone: {
        number: string;
        label: string;
    };
    email: {
        address: string;
        label: string;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CtaBannerSchema = new Schema<ICtaBanner>(
    {
        tag: {
            type: String,
            required: true,
            default: 'Ready to Transform Your Business?',
        },
        title: {
            type: String,
            required: true,
            default: 'Have an AI Idea or<br />Business Challenge?',
        },
        description: {
            type: String,
            required: true,
            default: 'Share your requirement with our team. We will review your business challenge and contact you to discuss a practical AI solution.',
        },
        button: {
            label: {
                type: String,
                required: true,
                default: 'Send Your Requirement',
            },
            link: {
                type: String,
                required: true,
                default: '/contact',
            },
        },
        phone: {
            number: {
                type: String,
                required: true,
                default: '8801XXXXXXXXX',
            },
            label: {
                type: String,
                required: true,
                default: 'Chat on WhatsApp',
            },
        },
        email: {
            address: {
                type: String,
                required: true,
                default: 'ai@ngenitltd.com',
            },
            label: {
                type: String,
                required: true,
                default: 'Email Our AI Team',
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

export const CtaBanner = mongoose.models.CtaBanner || mongoose.model<ICtaBanner>('CtaBanner', CtaBannerSchema);