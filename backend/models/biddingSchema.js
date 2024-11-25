import mongoose from "mongoose";

const biddingSchema = new mongoose.Schema({
    title: String,
    description: String,
    startingBid: Number,
    currentBid: {
        type: Number,
        default: 0
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
        
    ]
})

export const Bidding = mongoose.model("Bidding",biddingSchema);