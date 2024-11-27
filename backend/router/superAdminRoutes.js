import express from "express";
import { deleteBiddingItem,getAllPaymentProofs,getPaymentProofDetail,updateProofStatus,deletePaymentProof } from "../controllers/superAdminController.js";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.js";
 
const router = express.Router();

router.delete("/biddingitem/delete/:id",isAuthenticated, isAuthorized("Super Admin") ,deleteBiddingItem);
router.get("/paymentproofs/getall",isAuthenticated,isAuthorized("Super Admin"),getAllPaymentProofs);
router.get("/paymentproof/:id",isAuthenticated,isAuthorized("Super Admin"),getPaymentProofDetail);
router.put("/paymentproof/status/update/:id",isAuthenticated,isAuthorized("Super Admin"),updateProofStatus);
router.delete("/paymentproof/delete/:id",isAuthenticated,isAuthorized("Super Admin"),deletePaymentProof);

export default router;
