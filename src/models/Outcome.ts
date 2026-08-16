import mongoose, { Schema, Document } from 'mongoose';

export interface IOutcome extends Document {
    icon: string;
    title: string;
    description: string;
    stat: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const OutcomeSchema = new Schema<IOutcome>(
    {
        icon: {
            type: String,
            required: true,
            default: '⏱️',
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
        stat: {
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

export const Outcome = mongoose.models.Outcome || mongoose.model<IOutcome>('Outcome', OutcomeSchema);