import express from "express";
import { deleteBiddingItem,getAllPaymentProofs,getPaymentProofDetail,updateProofStatus,deletePaymentProof,fetchAllUsers,monthlyRevenue } from "../controllers/superAdminController.js";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.js";
 
const router = express.Router();

router.delete("/biddingitem/delete/:id",isAuthenticated, isAuthorized("Super Admin") ,deleteBiddingItem);
router.get("/paymentproofs/getall",isAuthenticated,isAuthorized("Super Admin"),getAllPaymentProofs);
router.get("/paymentproof/:id",isAuthenticated,isAuthorized("Super Admin"),getPaymentProofDetail);
router.put("/paymentproof/status/update/:id",isAuthenticated,isAuthorized("Super Admin"),updateProofStatus);
router.delete("/paymentproof/delete/:id",isAuthenticated,isAuthorized("Super Admin"),deletePaymentProof);
router.get("/users/getall",isAuthenticated,isAuthorized("Super Admin"),fetchAllUsers);
router.get("/monthlyrevenue",isAuthenticated,isAuthorized("Super Admin"),monthlyRevenue);

export default router;
