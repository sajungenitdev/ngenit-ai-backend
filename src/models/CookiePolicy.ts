import mongoose, { Schema, Document, Model } from "mongoose";

// ============================================================
// INTERFACES
// ============================================================

export interface ICookiePolicyMetadata {
  wordCount: number;
  characterCount: number;
}

export interface ICookiePolicy extends Document {
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
  version: number;
  publishedAt: Date | null;
  lastUpdated: Date;
  updatedBy: mongoose.Types.ObjectId | {
    _id: string;
    fullName: string;
    email: string;
  };
  metadata: ICookiePolicyMetadata;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// SCHEMA
// ============================================================

const CookiePolicySchema = new Schema<ICookiePolicy>(
  {
    title: {
      type: String,
      required: true,
      default: "Cookie Policy",
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
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
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

// ============================================================
// MIDDLEWARE
// ============================================================

// Pre-save middleware to update metadata
CookiePolicySchema.pre<ICookiePolicy>("save", function (next) {
  if (this.content) {
    // Remove HTML tags for accurate counting
    const plainText = this.content.replace(/<[^>]*>/g, "");
    
    // Count words (split by whitespace and filter empty)
    this.metadata.wordCount = plainText
      .split(/\s+/)
      .filter(Boolean)
      .length;
    
    // Count characters
    this.metadata.characterCount = plainText.length;
  }
  next();
});

// ============================================================
// INDEXES
// ============================================================

// Index for faster queries
CookiePolicySchema.index({ status: 1 });
CookiePolicySchema.index({ version: -1 });
CookiePolicySchema.index({ updatedAt: -1 });
CookiePolicySchema.index({ status: 1, version: -1 });

// Compound index for getting latest published version
CookiePolicySchema.index({ status: 1, version: -1, updatedAt: -1 });

// ============================================================
// STATIC METHODS
// ============================================================

interface ICookiePolicyModel extends Model<ICookiePolicy> {
  // Get the latest policy by status
  getLatestByStatus(status: "draft" | "published" | "archived"): Promise<ICookiePolicy | null>;
  
  // Get the latest published policy (for public display)
  getPublished(): Promise<ICookiePolicy | null>;
  
  // Get all versions with metadata
  getAllVersions(): Promise<ICookiePolicy[]>;
  
  // Archive all except the latest
  archiveOldVersions(excludeId: string): Promise<void>;
}

// Static method: Get latest by status
CookiePolicySchema.statics.getLatestByStatus = async function(
  status: "draft" | "published" | "archived"
): Promise<ICookiePolicy | null> {
  return this.findOne({ status })
    .sort({ version: -1, updatedAt: -1 })
    .populate("updatedBy", "fullName email")
    .lean();
};

// Static method: Get published policy
CookiePolicySchema.statics.getPublished = async function(): Promise<ICookiePolicy | null> {
  return this.findOne({ status: "published" })
    .sort({ version: -1 })
    .select("title content version publishedAt")
    .lean();
};

// Static method: Get all versions
CookiePolicySchema.statics.getAllVersions = async function(): Promise<ICookiePolicy[]> {
  return this.find()
    .sort({ version: -1, updatedAt: -1 })
    .populate("updatedBy", "fullName email")
    .select("title version status publishedAt updatedAt updatedBy")
    .lean();
};

// Static method: Archive old versions
CookiePolicySchema.statics.archiveOldVersions = async function(
  excludeId: string
): Promise<void> {
  await this.updateMany(
    {
      _id: { $ne: excludeId },
      status: { $ne: "archived" },
    },
    {
      status: "archived",
    }
  );
};

// ============================================================
// VIRTUAL PROPERTIES
// ============================================================

// Virtual: Is published
CookiePolicySchema.virtual("isPublished").get(function (this: ICookiePolicy) {
  return this.status === "published";
});

// Virtual: Is draft
CookiePolicySchema.virtual("isDraft").get(function (this: ICookiePolicy) {
  return this.status === "draft";
});

// Virtual: Is archived
CookiePolicySchema.virtual("isArchived").get(function (this: ICookiePolicy) {
  return this.status === "archived";
});

// Virtual: Reading time (in minutes)
CookiePolicySchema.virtual("readingTime").get(function (this: ICookiePolicy) {
  if (!this.metadata?.wordCount) return 1;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(this.metadata.wordCount / wordsPerMinute));
});

// ============================================================
// TO JSON TRANSFORM
// ============================================================

CookiePolicySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.__v;
    return ret;
  },
});

CookiePolicySchema.set("toObject", {
  virtuals: true,
});

// ============================================================
// EXPORT
// ============================================================

// Check if model already exists to prevent overwriting
const CookiePolicy = (mongoose.models.CookiePolicy as ICookiePolicyModel) ||
  mongoose.model<ICookiePolicy, ICookiePolicyModel>("CookiePolicy", CookiePolicySchema);

export default CookiePolicy;