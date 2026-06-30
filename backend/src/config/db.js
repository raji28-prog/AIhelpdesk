import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure environment variables are loaded from the backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Prepares and manages the MongoDB connection lifecycle.
 * Note: Actual connection will run when initialized in server.js.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in environment variables.');
    console.error('   Make sure backend/.env exists and contains MONGODB_URI=mongodb+srv://...');
    process.exit(1);
  }

  // Diagnostic: print which URI dotenv resolved (mask password if present)
  const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
  console.log(`🔍 [DB] Connecting to: ${maskedUri}`);

  if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
    console.error('❌ MONGODB_URI still points to localhost — update backend/.env with your Atlas URI!');
    process.exit(1);
  }

  // Set up connection event listeners for robustness
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB connection disconnected');
  });

  try {
    // Connect to database using mongoose
    await mongoose.connect(uri);
  } catch (error) {
    console.warn(`⚠️ Failed to connect to MongoDB on startup: ${error.message}`);
    console.warn('⚠️ Server will continue running, but database operations will be unavailable until connected.');
  }
};
