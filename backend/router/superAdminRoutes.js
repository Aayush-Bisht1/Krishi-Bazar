import express from "express";
import { deleteBiddingItem,getAllPaymentProofs,getPaymentProofDetail,updateProofStatus,deletePaymentProof,fetchAllUsers,monthlyRevenue } from "../controllers/superAdminController.js";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.js";
 
const router = express.Router();

router.delete("/biddingitem/delete/:id",isAuthenticated, isAuthorized("superadmin") ,deleteBiddingItem);
router.get("/paymentproofs/getall",isAuthenticated,isAuthorized("superadmin"),getAllPaymentProofs);
router.get("/paymentproof/:id",isAuthenticated,isAuthorized("superadmin"),getPaymentProofDetail);
router.put("/paymentproof/status/update/:id",isAuthenticated,isAuthorized("superadmin"),updateProofStatus);
router.delete("/paymentproof/delete/:id",isAuthenticated,isAuthorized("superadmin"),deletePaymentProof);
router.get("/users/getall",isAuthenticated,isAuthorized("superadmin"),fetchAllUsers);
router.get("/monthlyrevenue",isAuthenticated,isAuthorized("superadmin"),monthlyRevenue);

export default router;
