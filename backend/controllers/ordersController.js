import asyncHandler from '../middleware/asyncHandler.js';
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler( async(req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400);
    throw new Error('No Ordred Items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((product) => ({
        ...product,
        product: product._id,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    try {
      const createOrder = await order.save();
      return res.status(201).json(createOrder);
    } catch (error) {
      console.log(error);
    }
  }
});

const getMyOrders = asyncHandler( async(req, res) => {
  const orders = await Order.find({ user: req.user._id });
  return res.status(200).json(orders);
});

const getOrderById = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email'); // send the name and email too from the user collection

  if (order) {
    return res.status(200).json(order);
  } else {
    return res.status(404);
    throw new Error('Order Not found');
  }
})

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