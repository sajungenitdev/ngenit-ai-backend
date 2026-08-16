import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err: any) => ({
                field: err.path || err.param,
                message: err.msg,
            })),
        });
    }
    next();
};

export const validateHeroBanner = [
    body('badge').optional().isString().trim(),
    body('title').optional().isString().trim(),
    body('highlightedText').optional().isString().trim(),
    body('subtitle').optional().isString().trim(),
    body('buttonPrimary').optional().isString().trim(),
    body('buttonPrimaryLink').optional().isString().trim(),
    body('buttonSecondary').optional().isString().trim(),
    body('buttonSecondaryLink').optional().isString().trim(),
    body('stats').optional().isObject(),
    body('dashboard').optional().isObject(),
    body('floatingCards').optional().isObject(),
    body('isActive').optional().isBoolean(),
    validate,
];

export const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate,
];