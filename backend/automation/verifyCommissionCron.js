import { User } from "../models/userSchema.js";
import { Commission } from "../models/commissionSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import cron from "node-cron";
import { sendEmail } from "../utils/sendEmail.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const approvedPaymentProofs = await PaymentProof.find({
      status: "Approved",
    });
    for (const proof of approvedPaymentProofs) {
      try {
        const user = await User.findById(proof.userId);
        let updatedUserData = {};
        if (user) {
          if (user.unpaidCommission >= proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              { unpaidCommission: user.unpaidCommission - proof.amount },
              { new: true }
            );
            await PaymentProof.findByIdAndUpdate(
              proof._id,
              { status: "Settled" },
              { new: true }
            );
          } else {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              { unpaidCommission: 0 },
              { new: true }
            );
            await PaymentProof.findByIdAndUpdate(
              proof._id,
              { status: "Settled" },
              { new: true }
            );
          }
          await Commission.create({
            amount: proof.amount,
            user: user._id,
          });
          const settlementDate = new Date(Date.now())
            .toString()
            .substring(0, 15);
          const subject = `Your Payment Has Been Successfully Verified And Settled`;
          const message = `Dear ${user.userName},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled. Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.\n\nPayment Details:\nAmount Settled: ${proof.amount}\nUnpaid Amount: ${updatedUserData.unpaidCommission}\nDate of Settlement: ${settlementDate}\n\nBest regards,\n Krishi-Bazar Team`;
          sendEmail({ email: user.email, subject, message });
        }
        console.log(`User ${proof.userId} paid commission of ${proof.amount}`);
      } catch (error) {
        console.error(
          `Error processing commission proof for user ${proof.userId}: ${error.message}`
        );
      }
    }
  });
};