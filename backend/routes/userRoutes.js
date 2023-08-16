import express from "express";
const router = express.Router();
import { authUser, registerUser,
      logoutUser, getUserProfile,
    updateUserProfile, updateUser,
  getUsers, getUserById,
deleteUser } from "../controllers/userContoller.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect, isAdmin, getUsers).post(registerUser);
router.post('/logout', protect, logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id", ).delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser);

export default router;