import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';

// ============================================================
// LOAD ENVIRONMENT VARIABLES
// ============================================================
const envPath = path.join(__dirname, '../.env');
console.log('📁 Loading .env from:', envPath);
dotenv.config({ path: envPath });

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

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
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
        await connectDB();
        
        // Start Express server - bind to 0.0.0.0 for Render
        const server = app.listen(PORT, '0.0.0.0', () => {
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
                import('./config/database').then(({ disconnectDB }) => {
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

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('💥 Stack trace:', (error as Error).stack);
        process.exit(1);
    }
};

// ============================================================
// BOOTSTRAP
// ============================================================
startServer();

// Export for testing
export default app;