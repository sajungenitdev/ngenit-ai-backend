import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSubmission extends Document {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    service: string;
    message: string;
    consent: boolean;
    status: 'pending' | 'contacted' | 'completed';
    notes?: string;
    contactedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        service: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        consent: {
            type: Boolean,
            required: true,
            default: true,
        },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'completed'],
            default: 'pending',
        },
        notes: {
            type: String,
            trim: true,
        },
        contactedAt: {
            type: Date,
        },
        completedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const ContactSubmission = mongoose.models.ContactSubmission || 
    mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);