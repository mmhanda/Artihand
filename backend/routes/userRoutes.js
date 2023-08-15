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
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.get("/:id", ).delete(deleteUser).get(getUserById).put(updateUser);

export default router;