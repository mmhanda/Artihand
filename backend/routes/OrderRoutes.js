import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders,
          getOrderById, updateOrderToPaid,
            updateOrderToDelivered, getOrders}
from "../controllers/ordersController.js";

import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect, isAdmin, getOrders).post(protect, addOrderItems);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, isAdmin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);


export default router;