import express from "express";
const router = express.Router();
import { authUser, registerUser,
      logoutUser, getUserProfile,
    updateUserProfile, updateUser,
  getUsers, getUserById,
deleteUser } from "../controllers/userContoller.js";

router.route('/').get(authUser).post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);

export default router;