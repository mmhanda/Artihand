import asyncHandler from '../middleware/asyncHandler.js';
import Product from "../models/productModel.js";

const GetProductbyID = (asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);

  if (product)
    res.json(product);
  else {
    res.status(404);
    throw new Error("Item Not Found");
  }
}));

const Getproducts = (asyncHandler(async(req, res) => {
  const products = await Product.find();

  if (products)
    res.json(products);
  else {
    res.status(404);
    throw new Error("Page Not Found");
  }
}));

export { GetProductbyID, Getproducts };