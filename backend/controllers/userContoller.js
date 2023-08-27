import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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

    res.status(201).json({ // 201 code means some thing created on the server successfully
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
  const user = await User.findById(req.user._id);
  
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  };
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const userUpdates = await user.save();
    res.status(200).json({
      _id: userUpdates._id,
      name: userUpdates.name,
      isAdmin: userUpdates.isAdmin,
      email: userUpdates.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//:id needed here
const updateUser = asyncHandler(async (req, res) => {
  
});

//this just for the admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
  
    if (user) {
      res.status(200).json(users);
    }
  } catch (error) {
    console.error(error);
  }  
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  }
  else {
    throw new Error('User not found');
  }
});

//:id needed here
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400); //400 mean it a client error
      throw new Error('Cannot Delete Admin User');
    }
    else {
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User Deleted Successfully" });
    }
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});


export {authUser, registerUser,
          logoutUser, getUserProfile,
            updateUserProfile, updateUser,
              getUsers, getUserById, deleteUser};