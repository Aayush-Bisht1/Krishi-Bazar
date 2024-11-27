import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import errorHandler from "./error.js";

export const trackCommissionStatus = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {    
        return next(new errorHandler("User not found", 404));
    }
    if(user.unpaidCommission > 0){
        return next(new errorHandler(`You have unpaid commissions left of ${user.unpaidCommission}. Please pay them before posting new Bidding Items`, 403));
    }
    next();
});
