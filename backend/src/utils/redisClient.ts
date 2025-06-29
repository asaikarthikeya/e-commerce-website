// backend/src/utils/redisClient.ts
import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', err => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
  console.log('✅ Connected to Redis');
})();
