import { Bid } from "../models/bidSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import errorHandler from "../middlewares/error.js";
import { Bidding } from "../models/biddingSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
         return next(new errorHandler("Invalid Id",400));
     }
     const item = await Bidding.findById(id);
     const {amount} = req.body;
     if(!amount){
         return next(new errorHandler("Please provide a bid",400));
     }
     if(amount < item.startingBid){
        return next(new errorHandler("Bid must be greater than starting bid",400));
     }
     if(amount <= item.currentBid){
        return next(new errorHandler("Bid must be greater than current bid",400));
     }
     try {
        const existingBid = await Bid.findOne({
            "bidder.id" : req.user._id,
            biddingItem: item._id,
        })
        const existingBidInBidding = await Bidding.bids.find((bid) => bid.userId.toString() === req.user._id.toString());
        if(existingBid && existingBidInBidding){
            
        }
     } catch (error) {
        
     }
     const newBid = await Bid.create({
         amount,
         bidder: req.user._id,
         biddingItem: id,
     });
     res.status(201).json({
         success: true,
         newBid,
     });
});