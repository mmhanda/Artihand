import express from 'express';
import { GetProductbyID, Getproducts,
  createProduct } from "../controllers/productController.js";
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(Getproducts).post(protect, isAdmin, createProduct);
router.route('/:id').get(GetProductbyID);

export default router;