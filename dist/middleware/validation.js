"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateHeroBanner = exports.validate = void 0;
// Helper function for validation errors
const sendValidationError = (res, field, message) => {
    return res.status(400).json({
        success: false,
        errors: [{ field, message }],
    });
};
// Generic validation middleware
const validate = (req, res, next) => {
    // You can add general validation logic here if needed
    next();
};
exports.validate = validate;
// Hero Banner validators
exports.validateHeroBanner = [
    (req, res, next) => {
        const { badge, title, highlightedText, subtitle, buttonPrimary, buttonPrimaryLink, buttonSecondary, buttonSecondaryLink } = req.body;
        if (!badge?.trim()) {
            return sendValidationError(res, 'badge', 'Badge is required');
        }
        if (!title?.trim()) {
            return sendValidationError(res, 'title', 'Title is required');
        }
        if (!highlightedText?.trim()) {
            return sendValidationError(res, 'highlightedText', 'Highlighted text is required');
        }
        if (!subtitle?.trim()) {
            return sendValidationError(res, 'subtitle', 'Subtitle is required');
        }
        if (!buttonPrimary?.trim()) {
            return sendValidationError(res, 'buttonPrimary', 'Primary button text is required');
        }
        if (!buttonPrimaryLink?.trim()) {
            return sendValidationError(res, 'buttonPrimaryLink', 'Primary button link is required');
        }
        if (!buttonSecondary?.trim()) {
            return sendValidationError(res, 'buttonSecondary', 'Secondary button text is required');
        }
        if (!buttonSecondaryLink?.trim()) {
            return sendValidationError(res, 'buttonSecondaryLink', 'Secondary button link is required');
        }
        next();
    }
];
// Login validators
exports.validateLogin = [
    (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !email.includes('@') || !email.includes('.')) {
            return sendValidationError(res, 'email', 'Valid email is required');
        }
        if (!password || password.length < 6) {
            return sendValidationError(res, 'password', 'Password must be at least 6 characters');
        }
        next();
    }
];
//# sourceMappingURL=validation.js.map