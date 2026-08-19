import mongoose, { Schema, Document } from "mongoose";

export interface IPrivacyPolicy extends Document {
    title: string;
    content: string;
    status: "draft" | "published" | "archived";
    version: number;
    publishedAt: Date | null;
    lastUpdated: Date;
    metadata: {
        wordCount: number;
        characterCount: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
    {
        title: {
            type: String,
            required: true,
            default: "Privacy Policy",
            trim: true,
        },
        content: {
            type: String,
            required: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        version: {
            type: Number,
            default: 1,
        },
        publishedAt: {
            type: Date,
            default: null,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
        metadata: {
            wordCount: {
                type: Number,
                default: 0,
            },
            characterCount: {
                type: Number,
                default: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware
PrivacyPolicySchema.pre<IPrivacyPolicy>("save", function (next) {
    if (this.content) {
        const plainText = this.content.replace(/<[^>]*>/g, "");
        this.metadata.wordCount = plainText.split(/\s+/).filter(Boolean).length;
        this.metadata.characterCount = plainText.length;
    }
    next();
});

// Indexes
PrivacyPolicySchema.index({ status: 1 });
PrivacyPolicySchema.index({ version: -1 });
PrivacyPolicySchema.index({ status: 1, version: -1 });

export default mongoose.models.PrivacyPolicy ||
    mongoose.model<IPrivacyPolicy>("PrivacyPolicy", PrivacyPolicySchema);