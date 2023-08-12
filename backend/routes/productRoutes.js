import express from 'express';
import { GetProductbyID, Getproducts } from "../controllers/productController.js";

const router = express.Router();

router.route('/').get(Getproducts);
router.route('/:id').get(GetProductbyID);

export default router;