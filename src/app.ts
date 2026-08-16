import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

// Routes
import heroRoutes from './routes/heroRoutes';
import trustBarRoutes from './routes/trustBarRoutes';

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

// Security
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

// Logging
app.use(morgan('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// ROUTES (DB connection is handled in server.ts)
// ============================================================

// Root Route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'NGEN IT Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            hero: '/api/hero',
        },
    });
});

// Health Check
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

// API Routes
app.use('/api/hero', heroRoutes);
app.use('/api/trust-bar', trustBarRoutes);

// ============================================================
// ERROR HANDLER
// ============================================================

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('❌ Error:', err.stack);
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.url} not found`,
    });
});

export default app;