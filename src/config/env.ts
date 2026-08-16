import dotenv from 'dotenv';

dotenv.config();

export const config = {
    // Server
    port: parseInt(process.env.PORT || '5000'),
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // Database
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ngenit',
    
    // JWT
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    
    // Admin
    adminEmail: process.env.ADMIN_EMAIL || 'admin@ngenitltd.com',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    adminName: process.env.ADMIN_NAME || 'Admin',
    
    // CORS
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};