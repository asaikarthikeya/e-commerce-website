// backend/src/utils/redisClient.ts
import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// Parse host from URL to satisfy type check
const redisUrl = process.env.REDIS_URL || '';
const { hostname } = new URL(redisUrl);

export const redisClient = createClient({
  url: redisUrl,
  socket: {
    host: hostname,           // ✅ explicitly required
    tls: true,                // ✅ enable TLS
    rejectUnauthorized: false // optional
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
})();
