"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required. Please provide a valid token.',
            });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required. Token missing.',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token. Please login again.',
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired. Please login again.',
            });
        }
        return res.status(401).json({
            success: false,
            error: 'Authentication failed.',
        });
    }
};
exports.authenticate = authenticate;
const requireAdmin = (req, res, next) => {
    (0, exports.authenticate)(req, res, (err) => {
        if (err)
            return next(err);
        next();
    });
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map