import express from "express";
import { placeBid } from "../controllers/bidController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

router.post("/placebid/:id", isAuthenticated, isAuthorized("Buyer"), placeBid);

export default router;
