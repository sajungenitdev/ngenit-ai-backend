"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
// ============================================================
// LOAD ENVIRONMENT VARIABLES
// ============================================================
const envPath = path_1.default.join(__dirname, '../.env');
console.log('📁 Loading .env from:', envPath);
dotenv_1.default.config({ path: envPath });
// ============================================================
// PORT CONFIGURATION
// ============================================================
const PORT = parseInt(process.env.PORT || '5000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`🌍 Environment: ${NODE_ENV}`);
console.log(`📡 Port: ${PORT}`);
// ============================================================
// UNCAUGHT EXCEPTIONS & UNHANDLED REJECTIONS
// ============================================================
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    console.error('💥 Stack trace:', error.stack);
    // Graceful shutdown
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise);
    console.error('💥 Reason:', reason);
    // Graceful shutdown
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});
// ============================================================
// START SERVER
// ============================================================
const startServer = async () => {
    try {
        // Connect to database
        console.log('📡 Connecting to database...');
        await (0, database_1.connectDB)();
        // Start Express server - bind to 0.0.0.0 for Render
        const server = app_1.default.listen(PORT, '0.0.0.0', () => {
            console.log('='.repeat(60));
            console.log('🚀 NGEN IT Backend Server');
            console.log('='.repeat(60));
            console.log(`📡 Server: http://0.0.0.0:${PORT}`);
            console.log(`🏥 Health: http://0.0.0.0:${PORT}/api/health`);
            console.log(`🌍 Environment: ${NODE_ENV}`);
            console.log(`📦 MongoDB: ${process.env.MONGODB_URI?.replace(/\/\/.*@/, '//***:***@') || 'Not set'}`);
            console.log('='.repeat(60));
            console.log('✅ Server is ready to accept connections');
        });
        // ============================================================
        // GRACEFUL SHUTDOWN
        // ============================================================
        let isShuttingDown = false;
        const shutdown = () => {
            if (isShuttingDown) {
                console.log('⚠️ Shutdown already in progress...');
                return;
            }
            isShuttingDown = true;
            console.log('\n🛑 Received shutdown signal. Starting graceful shutdown...');
            // Close the server
            server.close(() => {
                console.log('✅ HTTP server closed');
                // Disconnect from database
                console.log('📡 Disconnecting from MongoDB...');
                // Import disconnectDB dynamically to avoid circular dependency
                Promise.resolve().then(() => __importStar(require('./config/database'))).then(({ disconnectDB }) => {
                    disconnectDB().then(() => {
                        console.log('✅ MongoDB disconnected');
                        console.log('👋 Graceful shutdown complete');
                        process.exit(0);
                    }).catch((err) => {
                        console.error('❌ Error disconnecting from MongoDB:', err);
                        process.exit(1);
                    });
                }).catch((err) => {
                    console.error('❌ Error importing disconnectDB:', err);
                    process.exit(1);
                });
            });
            // Force shutdown after timeout
            setTimeout(() => {
                console.error('⚠️ Force shutdown after timeout');
                process.exit(1);
            }, 10000);
        };
        // Listen for shutdown signals
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
        // Handle process exit
        process.on('exit', (code) => {
            console.log(`📤 Process exiting with code: ${code}`);
        });
        return server;
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('💥 Stack trace:', error.stack);
        process.exit(1);
    }
};
// ============================================================
// BOOTSTRAP
// ============================================================
startServer();
// Export for testing
exports.default = app_1.default;
//# sourceMappingURL=server.js.map