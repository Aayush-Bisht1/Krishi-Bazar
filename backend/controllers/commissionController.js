import { PaymentProof } from "../models/commissionProofSchema.js";
import { User } from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import errorHandler from "../middlewares/error.js";
import { Bidding } from "../models/biddingSchema.js";
import mongoose from "mongoose";

export const calculateCommission = async (biddingId) => {
    const biddingItem = await Bidding.findById(biddingId);
    if(!mongoose.Types.ObjectId.isValid(biddingId)){
        return next(new errorHandler("Invalid Id",400));
    }
    const commissionRate = 0.01;
    const commission = commissionRate*biddingItem.currentBid;
    return commission;
}

export const proofOfCommission = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new errorHandler("Commission Proof Required", 400));
    }
    const {proof} = req.files;
    const {amount,comment} = req.body;
    const user = await User.findById(req.user._id);
    if(!amount || !comment){
        return next(new errorHandler("Please provide amount and comment", 400));
    }
    if(user.unpaidCommission === 0){
        return res.status(200).json({
            success: true,
            message: "You don't have any unpaid commission"
        })
    }
    if(user.unpaidCommission < amount){
        return next(new errorHandler(`The amount exceeds your unpaid commission balance. Please enter an amount upto ${user.unpaidCommission}`, 400));
    }
    const availableFormats = ["image/jpeg", "image/png", "image/webp"];
    if(!availableFormats.includes(proof.mimetype)){
        return next(new errorHandler("Invalid Image Format", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(proof.tempFilePath,{
        folder: "KrishiBazar_CommissionProofs",
    });
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("cloudinary error ",
            cloudinaryResponse.error || "Unknown cloudinary error." );           
        return next(new errorHandler("Failed to upload commission proof to cloudinary",400));
    }
    const commissionProof = await PaymentProof.create({
        amount,
        comment,
        proof: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        userId: req.user._id
    });
    res.status(200).json({
        success: true,
        message: "Commission proof uploaded successfully. We will review it and respond you within 24 hours",
        commissionProof,
    })

});