import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

const registerUser = asyncHandler(async (req, res) => {
  res.send("user registred");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.send("user logout");
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
  res.send("user by id data");
});

//:id needed here
const deleteUser = asyncHandler(async (req, res) => {
  res.send("user deleted");
});


export {authUser, registerUser,
          logoutUser, getUserProfile,
            updateUserProfile, updateUser,
              getUsers, getUserById, deleteUser};