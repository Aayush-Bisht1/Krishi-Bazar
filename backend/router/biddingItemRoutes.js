import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";
import express from "express";
import { addNewBiddingItem, getAllItems, getBiddingDetails, getMyBiddingItems, removeFromBidding, republishItem } from "../controllers/biddingItemController.js";

const router = express.Router();

router.post("/create",isAuthenticated, isAuthorized("farmer"), trackCommissionStatus ,addNewBiddingItem);
router.get("/allitems",isAuthenticated,getAllItems);
router.get("/item/:id",isAuthenticated,getBiddingDetails);
router.get("/myitems",isAuthenticated,isAuthorized("farmer"),getMyBiddingItems);
router.delete("/delete/:id",isAuthenticated, isAuthorized("farmer") ,removeFromBidding);
router.put("/item/republish/:id",isAuthenticated,isAuthorized("farmer"), republishItem);


export default router; 