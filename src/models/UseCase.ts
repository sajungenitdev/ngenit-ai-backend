import mongoose, { Schema, Document } from 'mongoose';

export interface IUseCase extends Document {
    name: string;
    industry: string;
    service: string;
    desc: string;
    result: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UseCaseSchema = new Schema<IUseCase>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        industry: {
            type: String,
            required: true,
            trim: true,
        },
        service: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            required: true,
        },
        result: {
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

export const UseCase = mongoose.models.UseCase || mongoose.model<IUseCase>('UseCase', UseCaseSchema);