// backend/src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { redisClient } from './utils/redisClient';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();            // Load REDIS_URL, JWT_SECRET, PORT, etc.
redisClient;                // Initialize & connect Redis client

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Auth endpoints (register, login)
app.use('/api/auth', authRoutes);

// Product endpoints
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
