import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {

    const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET,
          { expiresIn: '100d' });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // don't use https on devmod
      sameSite: 'strict',
      maxAge: 100 * 24 * 60 * 60 * 1000, // to convert from days to millsecend 
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email Or Password');
  }
});

const logoutUser = asyncHandler(async (req, res) => {

  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({message: 'Logged out successfully'});
});

const registerUser = asyncHandler(async (req, res) => {
  res.send("user registred");
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("user profile updated");
});

//:id needed here
const updateUser = asyncHandler(async (req, res) => {
  res.send("user updated by admin");
});

//this just for the admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Users data");
});

const getUserById = asyncHandler(async (req, res) => {
  res.send("user data by id");
});

//:id needed here
const deleteUser = asyncHandler(async (req, res) => {
  res.send("user deleted");
});


export {authUser, registerUser,
          logoutUser, getUserProfile,
            updateUserProfile, updateUser,
              getUsers, getUserById, deleteUser};