import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import heroRoutes from './routes/heroRoutes';
import serviceRoutes from './routes/serviceRoutes';
import trustBarRoutes from './routes/trustBarRoutes';
import industryRoutes from './routes/industryRoutes';
import useCaseRoutes from './routes/useCaseRoutes';
import outcomeRoutes from './routes/outcomeRoutes';
import methodologyRoutes from './routes/methodologyRoutes';
import solutionRoutes from './routes/solutionRoutes';
import whyNgenRoutes from './routes/whyNgenRoutes';
import ctaBannerRoutes from './routes/ctaBannerRoutes';
import contactPageRoutes from './routes/contactPageRoutes';
import contactSubmissionRoutes from './routes/contactSubmissionRoutes';
import insightRoutes from './routes/insightRoutes';
import aboutPageRoutes from './routes/aboutPageRoutes';
import cookiePolicyroutes from "./routes/cookiePolicyroutes";
import privacyPolicyRoutes from "./routes/privacyPolicyRoutes";
import termsConditionsRoutes from "./routes/termsConditionsRoutes";
import { errorHandler } from './middleware/errorHandler';

// Register routes

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// ============================================================
// CORS CONFIGURATION - FIXED
// ============================================================
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ngenit-ai-services.vercel.app',
    'https://ngenit-ai-backend.onrender.com',
    process.env.CORS_ORIGIN,
].filter(Boolean);

console.log('🔓 CORS Origins:', allowedOrigins);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`❌ CORS blocked: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    maxAge: 86400, // 24 hours
}));

// Alternative: Simple CORS for development
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: '*',
        credentials: true,
    }));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'NGEN IT Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            hero: '/api/hero',
            trustBar: '/api/trust-bar',
            auth: '/api/auth',
        },
    });
});

app.get('/api/health', async (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    res.json({
        status: 'OK',
        message: 'NGEN IT API is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: {
            state: states[dbState as keyof typeof states] || 'unknown',
            connected: dbState === 1,
        },
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/trust-bar', trustBarRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/usecases', useCaseRoutes);
app.use('/api/outcomes', outcomeRoutes);
app.use('/api/methodology', methodologyRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/why-ngen', whyNgenRoutes);
app.use('/api/cta-banner', ctaBannerRoutes);
app.use('/api/contact-page', contactPageRoutes);
app.use('/api/contact-submissions', contactSubmissionRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/about-page', aboutPageRoutes);
app.use("/api/cookie-policy", cookiePolicyroutes);
app.use("/api/privacy-policy", privacyPolicyRoutes);
app.use("/api/terms-conditions", termsConditionsRoutes);

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.url} not found`,
    });
});

export default app;