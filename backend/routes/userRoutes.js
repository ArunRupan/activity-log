import express from "express";
import {
  authUser,
  regUser,
  logoutUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authM.js";

const router = express.Router();

router.post("/", regUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUser).put(protect, updateUser);

export default router;
