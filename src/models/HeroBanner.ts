import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroBanner extends Document {
    badge: string;
    title: string;
    highlightedText: string;
    subtitle: string;
    buttonPrimary: string;
    buttonPrimaryLink: string;
    buttonSecondary: string;
    buttonSecondaryLink: string;
    stats: {
        years: { value: string; label: string };
        markets: { value: string; label: string };
        partners: { value: string; label: string };
        clients: { value: string; label: string };
    };
    dashboard: {
        title: string;
        services: {
            icon: string;
            name: string;
            tag: string;
        }[];
        metrics: {
            value: string;
            label: string;
            trend: string;
        }[];
    };
    floatingCards: {
        left: string;
        right: string;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const HeroBannerSchema = new Schema<IHeroBanner>(
    {
        badge: { type: String, required: true },
        title: { type: String, required: true },
        highlightedText: { type: String, required: true },
        subtitle: { type: String, required: true },
        buttonPrimary: { type: String, required: true },
        buttonPrimaryLink: { type: String, required: true },
        buttonSecondary: { type: String, required: true },
        buttonSecondaryLink: { type: String, required: true },
        stats: {
            years: {
                value: { type: String, required: true },
                label: { type: String, required: true }
            },
            markets: {
                value: { type: String, required: true },
                label: { type: String, required: true }
            },
            partners: {
                value: { type: String, required: true },
                label: { type: String, required: true }
            },
            clients: {
                value: { type: String, required: true },
                label: { type: String, required: true }
            }
        },
        dashboard: {
            title: { type: String, required: true },
            services: [
                {
                    icon: { type: String, required: true },
                    name: { type: String, required: true },
                    tag: { type: String, required: true }
                }
            ],
            metrics: [
                {
                    value: { type: String, required: true },
                    label: { type: String, required: true },
                    trend: { type: String, required: true }
                }
            ]
        },
        floatingCards: {
            left: { type: String, required: true },
            right: { type: String, required: true }
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const HeroBanner = mongoose.models.HeroBanner || mongoose.model<IHeroBanner>('HeroBanner', HeroBannerSchema);