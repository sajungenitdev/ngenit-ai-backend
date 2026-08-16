"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from root
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    console.log('📝 Please check your .env file at:', path_1.default.join(__dirname, '../../.env'));
    process.exit(1);
}
console.log('✅ .env loaded successfully');
console.log('🔑 MongoDB URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
    if (cached.conn) {
        console.log('✅ Using existing MongoDB connection');
        return cached.conn;
    }
    if (!cached.promise) {
        // REMOVE bufferCommands: false or set it to true
        const opts = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            // Remove bufferCommands: false or set to true
            bufferCommands: true, // ← Changed to true
        };
        console.log('📡 Connecting to MongoDB Atlas...');
        cached.promise = mongoose_1.default.connect(MONGODB_URI, opts)
            .then(() => {
            console.log('✅ MongoDB Atlas connected successfully');
            return mongoose_1.default.connection;
        })
            .catch((err) => {
            console.error('❌ MongoDB connection failed:', err.message);
            console.log('💡 Troubleshooting tips:');
            console.log('   1. Check your internet connection');
            console.log('   2. Verify IP is whitelisted in Atlas');
            console.log('   3. Check username/password are correct');
            console.log('   4. Verify database name exists');
            process.exit(1);
        });
    }
    try {
        cached.conn = await cached.promise;
        if (cached.conn && cached.conn.db) {
            console.log(`📦 Database: ${cached.conn.db.databaseName}`);
        }
    }
    catch (e) {
        cached.promise = null;
        console.error('❌ MongoDB connection error:', e);
        throw e;
    }
    return cached.conn;
}
exports.connectDB = connectDB;
async function disconnectDB() {
    if (cached.conn) {
        await mongoose_1.default.disconnect();
        cached.conn = null;
        cached.promise = null;
        console.log('🔌 MongoDB disconnected');
    }
}
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=database.js.map