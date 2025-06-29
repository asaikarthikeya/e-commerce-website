// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { redisClient } from '../utils/redisClient';

const USER_PREFIX = 'user:';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const key = USER_PREFIX + username;

  try {
    // 1) Check if user exists
    if (await redisClient.exists(key)) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // 2) Hash password
    const hash = await bcrypt.hash(password, 10);

    // 3) Store in Redis hash
    await redisClient.hSet(key, { password: hash });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const key = USER_PREFIX + username;

  try {
    // 1) Fetch stored hash
    const storedHash = await redisClient.hGet(key, 'password');
    if (!storedHash) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2) Compare
    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3) Sign JWT
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
