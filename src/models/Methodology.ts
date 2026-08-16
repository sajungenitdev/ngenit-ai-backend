import mongoose, { Schema, Document } from 'mongoose';

export interface IMethodology extends Document {
    number: number;
    icon: string;
    title: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MethodologySchema = new Schema<IMethodology>(
    {
        number: {
            type: Number,
            required: true,
            unique: true,
        },
        icon: {
            type: String,
            required: true,
            default: '🔍',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
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

export const Methodology = mongoose.models.Methodology || mongoose.model<IMethodology>('Methodology', MethodologySchema);