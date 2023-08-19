import asyncHandler from '../middleware/asyncHandler.js';
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler( async(req, res) => {
  const {
    orderItems,
    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Ordred Items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((order) => ({
        ...order,
        
      })),
      shippingAdress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,  
    });
  }
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