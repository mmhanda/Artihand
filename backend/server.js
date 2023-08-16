import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMideleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  if (req.params.num == "pass") {
    res.send("hicsc");
  }
});

app.use('/api/products/', productRoutes);
app.use('/api/users/', usersRoutes);
app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT || 5000, () => { console.log("server is runing....") });
