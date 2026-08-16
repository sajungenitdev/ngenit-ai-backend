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
const heroRoutes_1 = __importDefault(require("./routes/heroRoutes"));
const trustBarRoutes_1 = __importDefault(require("./routes/trustBarRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use('/api/auth', authRoutes_1.default);
app.use('/api/hero', heroRoutes_1.default);
app.use('/api/trust-bar', trustBarRoutes_1.default);
// Error Handler
app.use(errorHandler_1.errorHandler);
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.url} not found`,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map