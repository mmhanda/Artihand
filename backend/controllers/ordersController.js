import asyncHandler from '../middleware/asyncHandler.js';
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler( async(req, res) => {
  res.send("add order item ");
});

const getMyOrders = asyncHandler( async(req, res) => {
  res.send("get My Orders ");
});

const getOrderById = asyncHandler( async(req, res) => {
  res.send("get Order By Id");
});

const updateOrderToPaid = asyncHandler( async(req, res) => {
  res.send("update Order To Paid");
});

const updateOrderToDelivered = asyncHandler( async(req, res) => {
  res.send("update Order To Delivered");
});

const getOrders = asyncHandler( async(req, res) => {
  res.send("get All Orders");
});

export { addOrderItems, getMyOrders,
          getOrderById, updateOrderToPaid,
            updateOrderToDelivered, getOrders};