import mongoose, { Schema, Document } from 'mongoose';

export interface IInsight extends Document {
    icon: string;
    cat: string;
    date: string;
    read: string;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const InsightSchema = new Schema<IInsight>(
    {
        icon: {
            type: String,
            required: true,
            default: '🧠',
        },
        cat: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: String,
            required: true,
        },
        read: {
            type: String,
            required: true,
            default: '5 min read',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
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

export const Insight = mongoose.models.Insight || mongoose.model<IInsight>('Insight', InsightSchema);