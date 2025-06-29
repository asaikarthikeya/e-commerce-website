import express from 'express';
import { getProductsByCategory } from '../controllers/productController';

const router = express.Router();

router.get('/:category', getProductsByCategory);

export default router;
