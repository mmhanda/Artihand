import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler( async (req, res, next) => {
  let token = req.cookie.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.UserId).select('-password'); //bring the object without the password
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, token needed');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as Admin');
  }
};

export { protect, isAdmin };