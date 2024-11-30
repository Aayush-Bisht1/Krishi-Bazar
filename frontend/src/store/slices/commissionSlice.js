import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
    commissions: [],
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
      state.commissions = action.payload.commissions;
    },
    postCommissionProofFailed(state) {
      state.loading = false;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  try {
    dispatch(commissionSlice.actions.postCommissionProofRequest());
    const response = await axios.post(
      "http://localhost:5000/api/v1/commission-proof",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};

export default commissionSlice.reducer;
