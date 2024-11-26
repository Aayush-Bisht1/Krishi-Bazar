import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import errorHandler from "./error.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){ 
        return next(new errorHandler("User is not authenticated",401));
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).exec();
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
})

export const isAuthorized = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new errorHandler("You are not authorized to access this resource",403));
        }
        next();
    }
}