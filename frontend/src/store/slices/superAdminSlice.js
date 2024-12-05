import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllBiddingItems } from "./biddingSlice";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalFarmers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    getMonthlyRevenueRequest(state, action) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    getMonthlyRevenueSuccess(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    getMonthlyRevenueFailed(state, action) {
      state.loading = false;
      state.monthlyRevenue = [];
    },
    fetchAllUsersRequest(state, action) {
      state.loading = true;
      state.totalFarmers = [];
      state.totalBidders = [];
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.totalFarmers = action.payload.farmersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    fetchAllUsersFailed(state, action) {
      state.loading = false;
      state.totalFarmers = [];
      state.totalBidders = [];
    },
    getAllPaymentProofsRequest(state, action) {
      state.loading = true;
      state.paymentProofs = [];
    },
    getAllPaymentProofsSuccess(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    getAllPaymentProofsFailed(state, action) {
      state.loading = false;
      state.paymentProofs = [];
    },
    deletePaymentProofRequest(state, action) {
      state.loading = true;
    },
    deletePaymentProofSuccess(state, action) {
      state.loading = false;
    },
    deletePaymentProofFailed(state, action) {
      state.loading = false;
    },
    getSinglePaymentProofRequest(state, action) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    getSinglePaymentProofSuccess(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    getSinglePaymentProofFailed(state, action) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
    deleteBiddingItemRequest(state, action) {
      state.loading = true;
    },
    deleteBiddingItemSuccess(state, action) {
      state.loading = false;
    },
    deleteBiddingItemFailed(state, action) {
      state.loading = false;
    },
    updateProofStatusRequest(state, action) {
      state.loading = true;
    },
    updateProofStatusSuccess(state, action) {
      state.loading = false;
    },
    updateProofStatusFailed(state, action) {
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.loading = false;
      state.singlePaymentProof = state.singlePaymentProof;
      state.paymentProofs = state.paymentProofs;
      state.monthlyRevenue = state.monthlyRevenue;
      state.totalFarmers = state.totalFarmers;
      state.totalBidders = state.totalBidders;    
    },
  },
});

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.getMonthlyRevenueRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/superadmin/monthlyrevenue",
      {
        withCredentials: true,
      }
    );
    dispatch(
      superAdminSlice.actions.getMonthlyRevenueSuccess(
        response.data.totalMonthlyRevenue
      )
    );
    toast.success(response.data.message);
  } catch (error) {
    dispatch(superAdminSlice.actions.getMonthlyRevenueFailed());
    toast.error(error.response.data.message);
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.fetchAllUsersRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/superadmin/users/getall",
      {
        withCredentials: true,
      }
    );
    dispatch(superAdminSlice.actions.fetchAllUsersSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(superAdminSlice.actions.fetchAllUsersFailed());
    toast.error(error.response.data.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.getAllPaymentProofsRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/superadmin/paymentproofs/getall",
      {
        withCredentials: true,
      }
    );
    dispatch(
      superAdminSlice.actions.getAllPaymentProofsSuccess(
        response.data.paymentProofs
      )
    );
    toast.success(response.data.message);
  } catch (error) {
    dispatch(superAdminSlice.actions.getAllPaymentProofsFailed());
    toast.error(error.response.data.message);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.deletePaymentProofRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/superadmin/paymentproof/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(superAdminSlice.actions.deletePaymentProofSuccess());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
  } catch (error) {
    dispatch(superAdminSlice.actions.deletePaymentProofFailed());
    toast.error(error.response.data.message);
  }
};

export const getSinglePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.getSinglePaymentProofRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/superadmin/paymentproof/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      superAdminSlice.actions.getSinglePaymentProofSuccess(
        response.data.paymentproofdetail
      )
    );
    toast.success(response.data.message);
  } catch (error) {
    dispatch(superAdminSlice.actions.getSinglePaymentProofFailed());
    toast.error(error.response.data.message);
  }
};

export const updateProofStatus = (id, status, amount) => async (dispatch) => {
  dispatch(superAdminSlice.actions.updateProofStatusRequest());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/superadmin/paymentproof/status/update/${id}`,
      {status,amount},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(superAdminSlice.actions.updateProofStatusSuccess());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
  } catch (error) {
    dispatch(superAdminSlice.actions.updateProofStatusFailed());
    toast.error(error.response.data.message);
  }
}

export const deleteBiddingItem = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.deleteBiddingItemRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/superadmin/biddingitem/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(superAdminSlice.actions.deleteBiddingItemSuccess());
    toast.success(response.data.message);
    dispatch(getAllBiddingItems());
  } catch (error) {
    dispatch(superAdminSlice.actions.deleteBiddingItemFailed());
    toast.error(error.response.data.message);
  }
};

export const clearAllErrors = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;
