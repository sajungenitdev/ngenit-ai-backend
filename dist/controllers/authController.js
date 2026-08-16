"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verify = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ngenitltd.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jsonwebtoken_1.default.sign({ userId: 'admin-1', email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '7d' });
            res.status(200).json({
                success: true,
                token,
                admin: {
                    id: 'admin-1',
                    name: ADMIN_NAME,
                    email: ADMIN_EMAIL,
                    role: 'admin',
                },
            });
        }
        else {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }
    }
    catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Login failed',
        });
    }
};
exports.login = login;
const verify = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No token provided',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        res.status(200).json({
            success: true,
            user: decoded,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid token',
        });
    }
};
exports.verify = verify;
const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map