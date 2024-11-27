import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { proofOfCommission } from "../controllers/commissionController.js";

const router = express.Router();

router.post("/proof", isAuthenticated, isAuthorized("Farmer"), proofOfCommission);

export default router;