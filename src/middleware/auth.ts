import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

// Force load .env from root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'a7b63242f42967b413b22b4044ac86ef999ca49e94501c411b112211067d0ccf';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('❌ No token provided');
            return res.status(401).json({
                success: false,
                error: 'Authentication required. Please provide a valid token.',
            });
        }

        const token = authHeader.split(' ')[1];
        console.log('🔑 Token received:', token.substring(0, 20) + '...');
        console.log('🔑 Verifying with secret:', JWT_SECRET.substring(0, 10) + '...');

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            email: string;
        };

        console.log('✅ Token verified for user:', decoded.email);
        req.user = decoded;

        next();
    } catch (error: any) {
        console.error('❌ Auth error:', error.message);
        
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

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    authenticate(req, res, (err) => {
        if (err) return next(err);
        next();
    });
};