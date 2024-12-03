import express from "express"
import { register, login, logout, getProfile, fetchLeaderboard, getUserById } from "../controllers/userController.js"
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/profile",isAuthenticated,getProfile);
router.get("/createdBy/:id",isAuthenticated,getUserById);
router.get("/leaderboard",isAuthenticated,fetchLeaderboard);

export default router;