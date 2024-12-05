import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import errorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import {Bidding} from "../models/biddingSchema.js"
import {PaymentProof} from "../models/commissionProofSchema.js"
import {Commission} from "../models/commissionSchema.js"
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
    const paymentProofs = await PaymentProof.find();
    res.status(200).json({
        success: true,
        paymentProofs,
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
    if(!amount || !status){ 
        return next(new errorHandler("Please provide amount and status",400));
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

export const fetchAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                    role: "$role",
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                month: "$_id.month",    
                year: "$_id.year",
                role: "$_id.role",
                count: 1,
                _id: 0
            },
        },
        {
            $sort: {year: 1, month: 1},
        }
    ]);

    const bidders = users.filter((user) => user.role === "Buyer");
    const farmers = users.filter((user) => user.role === "Farmer");
    
    const transformUsersToMonthlyArray = (data, totalMonths=12) => {
        const result = Array(totalMonths).fill(0);
        data.forEach((item) => {
            result[item.month - 1] = item.count;
        });
        return result;
    };

    const biddersArray = transformUsersToMonthlyArray(bidders);
    const farmersArray = transformUsersToMonthlyArray(farmers);

    res.status(200).json({    
        success: true,    
        biddersArray,
        farmersArray,
    });
    
});

export const monthlyRevenue = catchAsyncErrors(async (req, res, next) => {
    const payments = await Commission.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
                totalAmount: { $sum: "$amount" },
            }
        },
        {
            $sort: {"_id.year": 1, "_id.month": 1},
        }
    ])

    const transformRevenueToMonthlyArray = (payments, totalMonths=12) => {
        const result = Array(totalMonths).fill(0);
        payments.forEach((payment) => {
            result[payment._id.month - 1] = payment.totalAmount;
        });
        return result; 
    };

    const totalMonthlyRevenue = transformRevenueToMonthlyArray(payments);

    res.status(200).json({      
        success: true,
        totalMonthlyRevenue,    
    });
});