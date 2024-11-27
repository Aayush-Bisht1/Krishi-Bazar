import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import errorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import {Bidding} from "../models/biddingSchema.js"
import {PaymentProof} from "../models/commissionProofSchema.js"
import mongoose from "mongoose";

export const deleteBiddingItem = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return next(new errorHandler("Invalid Id",400));
    }
    const item = await Bidding.findById(id);
    if(!item){
      return next(new errorHandler("Item not found",404));
    }
    await item.deleteOne();
    res.status(200).json({
      success: true,
      message: "Item removed from bidding",
    })
});

export const getAllPaymentProofs = catchAsyncErrors(async (req, res, next) => {
    const paymentproof = await PaymentProof.find();
    res.status(200).json({
        success: true,
        paymentproof,
    })
});

export const getPaymentProofDetail = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const paymentproofdetail = await PaymentProof.findById(id);
    res.status(200).json({
        success: true,
        paymentproofdetail,
    })
});

export const updateProofStatus = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const {amount,status} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return next(new errorHandler("Invalid Id",400));
    }
    let proof = await PaymentProof.findById(id);
    if(!proof){
      return next(new errorHandler("Proof not found",404));
    }
    proof = await PaymentProof.findByIdAndUpdate(id,{status,amount},{
        new: true,
        runValidators: true,    
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Proof amount and status updated",
        proof,
    })
}); 

export const deletePaymentProof = catchAsyncErrors(async (req, res, next) => {
   const {id} = req.params;
   const proof = await PaymentProof.findById(id);
   if(!proof){
     return next(new errorHandler("Proof not found",404));
   } 
   await proof.deleteOne();
   res.status(200).json({
     success: true,
     message: "Proof removed",
   })
});