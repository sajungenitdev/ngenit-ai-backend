"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
// Routes
const heroRoutes_1 = __importDefault(require("./routes/heroRoutes"));
const trustBarRoutes_1 = __importDefault(require("./routes/trustBarRoutes"));
// Load .env
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const app = (0, express_1.default)();
// ============================================================
// MIDDLEWARE
// ============================================================
// Security
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
// CORS
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
// Logging
app.use((0, morgan_1.default)('dev'));
// Body Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
    const dbState = mongoose_1.default.connection.readyState;
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
            state: states[dbState] || 'unknown',
            connected: dbState === 1,
        },
    });
});
// API Routes
app.use('/api/hero', heroRoutes_1.default);
app.use('/api/trust-bar', trustBarRoutes_1.default);
// ============================================================
// ERROR HANDLER
// ============================================================
app.use((err, req, res, next) => {
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
exports.default = app;
//# sourceMappingURL=app.js.map