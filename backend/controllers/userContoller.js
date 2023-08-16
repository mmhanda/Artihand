import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

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

  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400); // the 400 code means client side error
    throw new Error('User already exist');
  }

  const user = await User.create({
        name: name,
        email:email,
        password: password });
  
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({ // 201 code means some thing created on the sevre successfully
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
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