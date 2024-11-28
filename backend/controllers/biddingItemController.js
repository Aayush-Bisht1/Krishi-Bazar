import { Bidding } from "../models/biddingSchema.js";
import {Bid} from "../models/bidSchema.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import errorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";

export const addNewBiddingItem = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new errorHandler("Bidding Item Image Required", 400));
  }
  const { images } = req.files;
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
  const invalidImages = images.filter(
    (image) => !allowedFormats.includes(image.mimetype)
  );
  if (invalidImages.length > 0) {
    return next(new errorHandler("Some Images Have Invalid Format", 400));
  }
  const {
    title,
    description,
    startingBid,
    startTime,
    endTime,
    category,
    condition,
  } = req.body;
  if (
    !title ||
    !description ||
    !startingBid ||
    !startTime ||
    !endTime ||
    !category ||
    !condition
  ) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  if (new Date(startTime) < Date.now()) {
    return next(new errorHandler("Start time cannot be in the past", 400));
  }
  if (new Date(startTime) >= new Date(endTime)) {
    return next(new errorHandler("Start time must be less than end time", 400));
  }
  const alreadyOneBiddingItemActive = await Bidding.findOne({
    createdBy: req.user._id,
    endTime: { $gt: Date.now() },
  });
  if (alreadyOneBiddingItemActive) {
    return next(
      new errorHandler("You already have an active bidding item", 400)
    );
  }
  try {
    const cloudinaryResponses = [];
    for (const image of images) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          image.tempFilePath,
          {
            folder: "KrishiBazar_BiddingItems",
          }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.error(
            "cloudinary error ",
            cloudinaryResponse.error || "Unknown cloudinary error."
          );
          return next(
            new errorHandler(
              "Failed to upload bidding images to cloudinary",
              400
            )
          );
        }
        cloudinaryResponses.push({
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        });
      } catch (error) {
        return next(
          new errorHandler("Failed to upload bidding images to Cloudinary", 500)
        );
      }
    }
    const biddingItem = await Bidding.create({
      title,
      description,
      startingBid,
      startTime,
      endTime,
      category,
      condition,
      createdBy: req.user._id,
      images: cloudinaryResponses,
    });
    return res.status(200).json({
      success: true,
      message: `Bidding Item Added Successfully at ${startTime}`,
      biddingItem,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 400));
  }
});

export const getAllItems = catchAsyncErrors(async (req, res, next) => {
  let items = await Bidding.find();
  if(!items){
    return next(new errorHandler("Items not found",404));
  }
  res.status(200).json({
    success: true,
    items,
  })
});

export const getBiddingDetails = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new errorHandler("Invalid Id",400));
  }
  const item = await Bidding.findById(id);
  if(!item){
    return next(new errorHandler("Item not found",404));
  }
  const sortedBidders = item.bids.sort((a,b) => b.bid - a.bid);
  res.status(200).json({
    success: true,
    item,
    bidders: sortedBidders,
  })
});

export const getMyBiddingItems = catchAsyncErrors(async (req, res, next) => {
  const items = await Bidding.find({createdBy: req.user._id});
  if(!items){
    return next(new errorHandler("Items not found",404));
  }
  res.status(200).json({
    success: true,
    items,
  })
});

export const removeFromBidding = catchAsyncErrors(async (req, res, next) => {
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

export const republishItem = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new errorHandler("Invalid Id",400));
  }
  let republishingItem = await Bidding.findById(id);
  if(!republishingItem){
    return next(new errorHandler("Item not found",404));
  }
  if(!req.body.startTime || !req.body.endTime){
    return next(new errorHandler("Please provide start and end time",400));
  }
  if(new Date(republishingItem.endTime) > Date.now()){
    return next(new errorHandler("Item is not expired, cannot republish",400));
  }
  let data = {
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
  };
  if(data.startTime < Date.now()){
    return next(new errorHandler("Start time cannot be in the past",400));
  }
  if(data.startTime >= data.endTime){
    return next(new errorHandler("Start time must be less than end time",400));
  }  
  if(republishingItem.highestBidder){
    const highestBidder = User.findById(republishingItem.highestBidder);
    highestBidder.moneySpent -= republishingItem.currentBid;
    highestBidder.biddingsWon -= 1;
    highestBidder.save();
  }

  data.bids = [];
  data.currentBid = 0;
  data.highestBidder = null;
  data.commissionCalculated = false; 
  republishingItem = await Bidding.findByIdAndUpdate(id,data,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await Bid.deleteMany({biddingItem: republishingItem._id});
  const {createdBy} = republishingItem;
  if(!createdBy){
    return next(new errorHandler("creator of item not found",404));
  }
  await User.findByIdAndUpdate(createdBy,{unpaidCommission: 0},{
    new: true,
    runValidators: true,
    useFindAndModify: false, 
  })
  res.status(200).json({
    success: true,
    message: `Item republished and will be active on ${req.body.startTime}`,
    republishingItem,
    createdBy,
  })
});