import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    amount: Number,
    bidder: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: String,
        profileImage: String,
    },
    biddingItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bidding",
        required: true,
    },
});

export const Bid = mongoose.model("Bid",bidSchema);