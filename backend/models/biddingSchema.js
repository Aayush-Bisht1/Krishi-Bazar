import mongoose from "mongoose";

const biddingSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  currentBid: {
    type: Number,
    default: 0,
  },
  category: String,
  type: {
    type: String,
    enum: ["yielditem", "contract"],
  },
  location: String,
  condition: {
    type: String,
    enum: ["fair", "good", "excellent"],
  },
  quantity: String,
  unit:{
    type: String,
    enum: ["quintal","kg","ton"],
  },
  startTime: String,
  endTime: String,
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bids: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
      },
      userName: String,
      profileImage: String,
      amount: Number,
    },
  ],
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commissionCalculated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Bidding = mongoose.model("Bidding", biddingSchema);
