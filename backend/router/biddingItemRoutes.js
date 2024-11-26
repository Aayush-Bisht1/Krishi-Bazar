import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import express from "express";
import { addNewBiddingItem, getAllItems, getBiddingDetails, removeFromBidding, republishItem } from "../controllers/biddingItemController.js";

const router = express.Router();

router.post("/create",isAuthenticated, isAuthorized("Farmer") ,addNewBiddingItem);
router.get("/allitems",isAuthenticated,getAllItems);
router.get("/bidding/:id",isAuthenticated,getBiddingDetails);
router.delete("/delete/:id",isAuthenticated, isAuthorized("Farmer") ,removeFromBidding);
router.put("/item/republish/:id",isAuthenticated,isAuthorized("Farmer"), republishItem);


export default router; 