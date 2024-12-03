import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "axios";
import { toast } from "react-toastify";

const biddingSlice = createSlice({
  name: "bidding",
  initialState: {
    loading: false,
    itemDetails: {},
    biddingDetails: {},
    biddingItemBidders: {},
    myBiddingItem: [],
    allBiddingItems: [],
  },
  reducers: {
    getAllBiddingItemsRequest(state, action) {
      state.loading = true;
    },
    getAllBiddingItemsSuccess(state, action) {
      state.loading = false;
      state.allBiddingItems = action.payload;
    },
    getAllBiddingItemsFailed(state, action) {
      state.loading = false;
    },
    getBiddingDetailsRequest(state, action) { 
      state.loading = true;
    },
    getBiddingDetailsSuccess(state, action) {
      state.loading = false;
      state.biddingDetails = action.payload.item;
      state.biddingItemBidders = action.payload.bidders;
    },
    getBiddingDetailsFailed(state, action) {
      state.loading = false;
    },
    resetSlice(state, action) {
      state.loading = false;
      state.itemDetails = state.itemDetails;
      state.biddingDetails = state.biddingDetails;
      state.biddingItemBidders = state.biddingItemBidders;
      state.myBiddingItem = state.myBiddingItem;
      state.allBiddingItems = state.allBiddingItems;
    },
  },
});

export const getAllBiddingItems = () => async (dispatch) => {
  dispatch(biddingSlice.actions.getAllBiddingItemsRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/biddingitem/allitems",
      {
        withCredentials: true,
      }
    );
    dispatch(
      biddingSlice.actions.getAllBiddingItemsSuccess(response.data.items)
    );
    dispatch(biddingSlice.actions.resetSlice());
  } catch (error) {
    dispatch(biddingSlice.actions.getAllBiddingItemsFailed());
    toast.error(error.response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  }
};

export const getBiddingDetails = (id) => async (dispatch) => {
  dispatch(biddingSlice.actions.getBiddingDetailsRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/biddingitem/item/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(biddingSlice.actions.getBiddingDetailsSuccess(response.data));
    dispatch(biddingSlice.actions.resetSlice());
  } catch (error) {
    dispatch(biddingSlice.actions.getBiddingDetailsFailed());
    toast.error(error.response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  }
};

export default biddingSlice.reducer;
