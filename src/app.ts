import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import heroRoutes from './routes/heroRoutes';
import trustBarRoutes from './routes/trustBarRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

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