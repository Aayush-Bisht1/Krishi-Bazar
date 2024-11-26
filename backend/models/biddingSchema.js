import mongoose from "mongoose";

const biddingSchema = new mongoose.Schema({
    title: String,
    description: String,
    startingBid: Number,
    currentBid: {
        type: Number,
        default: 0
    },
    category: String,
    condition: {
        type: String,
        enum: ["Fair","Good","Excellent"]
    },
    startTime: String,
    endTime: String,
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }  
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bids: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bid",
            },
            userName: String,
            profileImage: String,
            amount: Number
        },
    ],
    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commissionCalculated: {
        type: Boolean,  
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Bidding = mongoose.model("Bidding",biddingSchema);