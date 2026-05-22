import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

/**
 * Health check endpoint
 * Handy for verifying that the backend service is running and healthy.
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Sample main API endpoint
 */
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Node.js TypeScript API!',
    version: '1.0.0',
  });
});

// Fallback for 404 (Not Found) routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server after connecting to MongoDB
async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🏥 Health check at http://localhost:${PORT}/api/health`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error('❌ Failed to start server due to database connection error:', error);
    process.exit(1);
  }
}

startServer();
