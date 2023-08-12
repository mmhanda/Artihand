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
    
    await Product.insertMany(producteSample);
    
    console.log(" Data imported sucessfully ");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

const deleteData = async () => {

  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Database cleared");
    process.exit();

  } catch (error) {
    console.log("problem removing data!");
    console.log(error.message);
  }
}

