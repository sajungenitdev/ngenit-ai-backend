import mongoose, { Schema, Document } from 'mongoose';

export interface ITrustBar extends Document {
    isEnabled: boolean;
    leftText: string;
    partners: {
        id: string;
        name: string;
        logo?: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const TrustBarSchema = new Schema<ITrustBar>(
    {
        isEnabled: {
            type: Boolean,
            default: true,
        },
        leftText: {
            type: String,
            required: true,
            default: 'Technology Ecosystem',
        },
        partners: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                logo: { type: String },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const TrustBar = mongoose.models.TrustBar || mongoose.model<ITrustBar>('TrustBar', TrustBarSchema);