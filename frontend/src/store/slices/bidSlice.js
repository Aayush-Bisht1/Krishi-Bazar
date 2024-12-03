import { createSlice } from "@reduxjs/toolkit"; 
import { toast } from "react-toastify";
import axios from "axios";

const bidSlice = createSlice({
    name: "bid",
    initialState: {
        loading: false,
    },
    reducers: {
        bidRequest(state) {
            state.loading = true;
        },
        bidSuccess(state) {
            state.loading = false;
        },
        bidFailed(state) {
            state.loading = false;
        },
    }
})

export const placeBid = (id,data) => async (dispatch) => {
    dispatch(bidSlice.actions.bidRequest());
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/bid/placebid/${id}`,data,{
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        dispatch(bidSlice.actions.bidSuccess());
        toast.success(response.data.message || "Bid placed successfully");
    } catch (error) {
        dispatch(bidSlice.actions.bidFailed());
        toast.error(error.response.data.message);
    }
}

export default bidSlice.reducer;