import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import express from "express";
import { addNewBiddingItem } from "../controllers/biddingItemController.js";

const router = express.Router();

router.post("/create",isAuthenticated, isAuthorized("Farmer") ,addNewBiddingItem);

export default router;