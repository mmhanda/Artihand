import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import usersRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMideleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookieParser for accesing the req.cookie.nameofcokie wich is Jwt 

app.get('/', (req, res) => {
  if (req.params.num == "pass") {
    res.send("this is from main route Should remove this message");
  }
});

app.use('/api/products/', productRoutes);
app.use('/api/upload/', uploadRoute);
app.use('/api/users/', usersRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/config/paypal', ( req, res ) =>
          res.status(200).send({ clientId: process.env.PAYPAL_CLIENT_ID }));

const __dirname = path.resolve(); // this is for bring the current dir
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT || 5000, () => { console.log(`server is runing.... on Port ${process.env.PORT}`) });
