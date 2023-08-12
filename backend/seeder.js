import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/productes.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js"
import Connectdb from "./config/db.js";

dotenv.config();

Connectdb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const userAdmin = createdUsers[0]._id;
    
    console.log(userAdmin);

    const producteSample = products.map((product) => {
      return { ...product, user: userAdmin };
    })
    
    const createdProducts = await Product.insertMany(producteSample);
    console.log(" Data imported sucessfully ");
  } catch (error) {
    console.log(error.message);
  }
}
