import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import connectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js"
import biddingItemRouter from "./router/biddingItemRoutes.js"
import bidRouter from "./router/bidRoutes.js"
import commissionRouter from "./router/commissionRoutes.js"
import superAdminRouter from "./router/superAdminRoutes.js"
import {endedBiddingCron} from "./automation/endedBiddingCron.js"
import {verifyCommissionCron} from "./automation/verifyCommissionCron.js"

dotenv.config();

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
))
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))

app.use("/api/v1/user",userRouter);
app.use("/api/v1/biddingitem",biddingItemRouter);
app.use("/api/v1/bid",bidRouter);
app.use("/api/v1/commission",commissionRouter);
app.use("/api/v1/superadmin",superAdminRouter);


endedBiddingCron();
verifyCommissionCron();
connectDB();
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})