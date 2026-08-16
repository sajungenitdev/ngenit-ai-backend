import mongoose, { Schema, Document } from 'mongoose';

export interface ISolution extends Document {
    tag: string;
    name: string;
    desc: string;
    tags: string[];
    footer: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SolutionSchema = new Schema<ISolution>(
    {
        tag: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
            default: [],
        },
        footer: {
            type: String,
            required: true,
            trim: true,
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

export const Solution = mongoose.models.Solution || mongoose.model<ISolution>('Solution', SolutionSchema);