"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroBanner = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const HeroBannerSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.HeroBanner = mongoose_1.default.models.HeroBanner || mongoose_1.default.model('HeroBanner', HeroBannerSchema);
//# sourceMappingURL=HeroBanner.js.map