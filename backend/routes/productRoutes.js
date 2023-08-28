import express from 'express';
import { GetProductbyID, Getproducts,
  createProduct, updateProduct, deleteProduct,
createProductReview } from "../controllers/productController.js";
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(Getproducts).post(protect, isAdmin, createProduct);
router.route('/:id').get(GetProductbyID).put(protect, isAdmin, updateProduct)
                    .delete(protect, isAdmin, deleteProduct);
router.route('/:id/reviews').post(protect, createProduct);

export default router;