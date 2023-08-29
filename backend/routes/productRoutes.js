import express from 'express';
import { GetProductbyID, Getproducts,
  createProduct, updateProduct, deleteProduct,
createProductReview, GetTopProducts} from "../controllers/productController.js";
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(Getproducts).post(protect, isAdmin, createProduct);
router.route('/top').get(GetTopProducts);
router.route('/:id').get(GetProductbyID).put(protect, isAdmin, updateProduct)
                    .delete(protect, isAdmin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;