import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ngenitltd.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jwt.sign(
                { userId: 'admin-1', email: ADMIN_EMAIL },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

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
        } else {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials',
            });
        }
    } catch (error: any) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Login failed',
        });
    }
};

export const verify = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No token provided',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({
            success: true,
            user: decoded,
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            error: 'Invalid token',
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};