import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

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

        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            email: string;
        };

        req.user = decoded;

        next();
    } catch (error: any) {
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