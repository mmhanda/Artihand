import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMideleware.js";

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  if (req.params.num == "pass") {
    res.send("hicsc");
  }
});

app.use('/api/products/', productRoutes);
// app.use('/api/users/', userRoutes);
app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT || 5000, () => { console.log("server is runing....") });
