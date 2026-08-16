import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error);
    process.exit(1);
});

// Start server only after DB connection
const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();

        // Then start the server
        const server = app.listen(PORT, () => {
            console.log('='.repeat(50));
            console.log('🚀 NGEN IT Backend Server');
            console.log('='.repeat(50));
            console.log(`📡 Server: http://localhost:${PORT}`);
            console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('='.repeat(50));
        });

        // Graceful shutdown
        const shutdown = () => {
            console.log('\n🛑 Shutting down server...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

        return server;
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;