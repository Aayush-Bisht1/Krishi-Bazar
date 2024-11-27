import { Bid } from "../models/bidSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import errorHandler from "../middlewares/error.js";
import { Bidding } from "../models/biddingSchema.js";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
         return next(new errorHandler("Invalid Id",400));
     }
     const biddingItem = await Bidding.findById(id);
     const {amount} = req.body;
     if(!amount){
         return next(new errorHandler("Please provide a bid",400));
     }
     if(amount < biddingItem.startingBid){
        return next(new errorHandler("Bid must be greater than starting bid",400));
     }
     if(amount <= biddingItem.currentBid){
        return next(new errorHandler("Bid must be greater than current bid",400));
     }
     if(new Date(biddingItem.startTime) > Date.now()){
        return next(new errorHandler("Bidding has not started yet.",400));
     }
     if(new Date(biddingItem.endTime) < Date.now()){
         return next(new errorHandler("Bidding has finished already.",400));
     }
     try {
        const existingBid = await Bid.findOne({
            "bidder.id" : req.user._id,
            biddingItem: biddingItem._id,
        })
        const existingBidInBidding = biddingItem.bids?.find((bid) => bid.userId.toString() === req.user._id.toString());
        if(existingBid && existingBidInBidding){
            existingBidInBidding.amount = amount;
            existingBid.amount = amount;
            biddingItem.currentBid = amount;
            await existingBid.save();
        }else{
            const bidderDetail = await User.findById(req.user._id);
            const bid = await Bid.create({
                amount,
                bidder: {
                    id: req.user._id,
                    userName: bidderDetail.userName,
                    profileImage: bidderDetail.profileImage?.url,
                },
                biddingItem: biddingItem._id,
            });
            biddingItem.bids.push({
                userId: req.user._id,
                userName: bidderDetail.userName,
                profileImage: bidderDetail.profileImage?.url,
                amount
            }); 
            biddingItem.currentBid = amount;
        }
        await biddingItem.save();
        res.status(200).json({
            success: true,
            message: "Bid placed successfully",
            biddingItem,
        })
     } catch (error) {
        return next(new errorHandler(error.message || "Failed to place bid",500));
     }
});