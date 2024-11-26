import errorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js"
import {v2 as cloudinary} from "cloudinary"
import { generateToken } from "../utils/jwtToken.js";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"

export const register = catchAsyncErrors(async (req,res,next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new errorHandler("Profile Image Required", 400));
    }
    const {profileImage} = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if(!allowedFormats.includes(profileImage.mimetype)){
        return next(new errorHandler("Invalid Image Format", 400)); 
    }
    
    const {userName, email, password, address, phoneNo, bankAccountNumber,bankAccountType, bankName, razorPayId, role} = req.body;

    if(!userName || !email || !password || !address || !phoneNo || !role){
        return next(new errorHandler("Please fill all the fields", 400));
    }
    if(role === "Farmer"){
        if(!bankAccountNumber || !bankAccountType || !bankName){
            return next(new errorHandler("Please provide your bank details", 400));
        }
        if(!razorPayId){
            return next(new errorHandler("Please provide your RazorPay Id", 400));
        }
    }

    const isregistered = await User.findOne({email});
    if(isregistered){
        return next(new errorHandler("User already exists",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath,
    {
        folder: "KrishiBazar_profileImages"
    } 
    );

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("cloudinary error ",
            cloudinaryResponse.error || "Unknown cloudinary error."
        )
        return next(new errorHandler("Failed to upload profile image to cloudinary",400))
    }

    const user = await User.create({
        userName, 
        email, 
        password, 
        address, 
        phoneNo, 
        role,
        profileImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
        paymentMethods: {
            bankTransfer: {
                bankAccountNumber,
                bankAccountType,
                bankName
            },
            razorPay: {
                razorPayId,
            }
        },
    });

    generateToken(user,"User Registered",201,res);
});

export const login = catchAsyncErrors(async (req,res,next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new errorHandler("Please fill all the fields", 400));
    }
    const user  = await User.findOne({email}).select("+password");
    if(!user){
        return next(new errorHandler("User not found", 400));
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return next(new errorHandler("Incorrect Password", 400));
    }
    generateToken(user,"User Logged In",200,res);
});

export const logout = catchAsyncErrors(async (req,res,next) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "User Logged Out"
    })
});

export const getProfile = catchAsyncErrors(async (req,res,next) => {
    const user = req.user;
    if(!user){
        return next(new errorHandler("User not found", 400));
    }
    const userData = user.toObject();
    res.status(200).json({
        success: true,
        user: userData,
    });
});

export const fetchLeaderboard = catchAsyncErrors(async (req,res,next) => {
    const users = User.find({moneySpent: {$gt: 0}});
    const leaderboard = users.sort((a,b)=> b.moneySpent - a.moneySpent);
    res.status(200).json({
        success: true,
        leaderboard,
    })
});