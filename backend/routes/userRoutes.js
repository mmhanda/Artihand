import express from "express";
const router = express.Router();
import { authUser, registerUser,
      logoutUser, getUserProfile,
    updateUserProfile, updateUser,
  getUsers, getUserById,
deleteUser } from "../controllers/userContoller.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect, isAdmin, getUsers).post(protect, isAdmin, registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id", ).delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser);

export default router;