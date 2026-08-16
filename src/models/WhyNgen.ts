import mongoose, { Schema, Document } from 'mongoose';

export interface IWhyNgen extends Document {
    tag: string;
    title: string;
    description: string;
    button: {
        label: string;
        link: string;
    };
    features: {
        icon: string;
        title: string;
        description: string;
    }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const WhyNgenSchema = new Schema<IWhyNgen>(
    {
        tag: {
            type: String,
            required: true,
            default: 'Why NGEN IT',
        },
        title: {
            type: String,
            required: true,
            default: 'Your Trusted AI Partner<br />from Strategy to Deployment',
        },
        description: {
            type: String,
            required: true,
            default: 'We combine deep business consulting experience with technical AI expertise and local deployment capability — serving enterprise, government and industrial organizations across multiple markets.',
        },
        button: {
            label: {
                type: String,
                required: true,
                default: 'Discuss Your Requirement',
            },
            link: {
                type: String,
                required: true,
                default: '/contact',
            },
        },
        features: [
            {
                icon: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const WhyNgen = mongoose.models.WhyNgen || mongoose.model<IWhyNgen>('WhyNgen', WhyNgenSchema);