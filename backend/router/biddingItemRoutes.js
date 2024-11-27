import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";
import express from "express";
import { addNewBiddingItem, getAllItems, getBiddingDetails, getMyBiddingItems, removeFromBidding, republishItem } from "../controllers/biddingItemController.js";

const router = express.Router();

router.post("/create",isAuthenticated, isAuthorized("Farmer"), trackCommissionStatus ,addNewBiddingItem);
router.get("/allitems",isAuthenticated,getAllItems);
router.get("/bidding/:id",isAuthenticated,getBiddingDetails);
router.get("/myitems",isAuthenticated,isAuthorized("Farmer"),getMyBiddingItems);
router.delete("/delete/:id",isAuthenticated, isAuthorized("Farmer") ,removeFromBidding);
router.put("/item/republish/:id",isAuthenticated,isAuthorized("Farmer"), republishItem);


export default router; 