import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        minLength: [4, "Username must be at least 4 characters long."],
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters long."],
        selected: false
    },
    address: String,
    phoneNo:{
        type: String,
        required: true,
        length: [10, "Phone number must be 10 digits long."]
    },
    profileImage: {
        public_id: {
            type: String,
            required: true  
        },
        url: {
            type: String,
            required: true
        }
    },
    paymentMethods: {
        bankTransfer: {
            bankAccountNumber: String,
            bankAccountName: String,
            bankName: String
        },
        razorPay: {
            razorPayId: String
        }
    },
    role: {
        type: String,
        enum: ["farmer","buyer","super admin"]
    },
    unpaidCommission: {
        type: Number,
        default: 0
    },
    biddingsWon: {
        type: Number,
        default: 0
    },
    moneySpent: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
} );

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE_IN,
    });
}

export const User = mongoose.model("User",userSchema);