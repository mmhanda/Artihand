import express from "express";
import products from "./data/productes.js"
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.get('/:num', (req, res) => {
  if (req.params.num == "pass") {
    res.send("hicsc");
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((e) => e._id == req.params.id)
  res.json(product);
})

app.get('/api/products', (req, res) => {
  res.json(products);
})

app.listen(process.env.PORT || 5000, () => { console.log("server is runing....") });