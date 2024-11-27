import cron from "node-cron";
import { Bidding } from "../models/biddingSchema.js";
import { User } from "../models/userSchema.js";
import { calculateCommission } from "./commissionController.js";
import { Bid } from "../models/bidSchema.js";
import {sendEmail} from "../utils/sendEmail.js"

export const endedBiddingCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    const endedBiddingItems = await Bidding.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    for (const item of endedBiddingItems) {
      try {
        const commissionAmount = await calculateCommission(item._id);
        item.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          biddingItem: item._id,
          amount: item.currentBid,
        });
        const farmer = await User.findById(item.createdBy);
        farmer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          item.highestBidder = highestBidder.bidder.id;
          await item.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                biddingsWon: 1,
              },
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
          await User.findByIdAndUpdate(
            farmer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
          const subject = `Congratulations! You won the bidding for ${item.title}`;
          const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the bidding for ${item.title}. \n\nBefore proceeding for payment contact your seller via your seller email:${farmer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n- Account Name: ${farmer.paymentMethods.bankTransfer.bankAccountName} \n- Account Number: ${farmer.paymentMethods.bankTransfer.bankAccountNumber} \n- Bank: ${farmer.paymentMethods.bankTransfer.bankName}\n\n2. **PayPal**:\n- Send payment to: ${farmer.paymentMethods.paypal.paypalEmail}\n\n3. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${farmer.email}\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\n Krishi-Bazar Team`;
          console.log("SENDING EMAIL TO HIGHEST BIDDER");
          sendEmail({ email: bidder.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  });
};
