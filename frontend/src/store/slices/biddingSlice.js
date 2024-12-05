import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const biddingSlice = createSlice({
  name: "bidding",
  initialState: {
    loading: false,
    itemDetails: {},
    biddingDetails: {},
    biddingItemBidders: [],
    myBiddingItems: [],
    allBiddingItems: [],
  },
  reducers: {
    createBiddingItemRequest(state, action) {
      state.loading = true;
    },
    createBiddingItemSuccess(state, action) {
      state.loading = false;
    },
    createBiddingItemFailed(state, action) {
      state.loading = false;
    },
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
    getMyBiddingItemsRequest(state, action) {
      state.loading = true;
      state.myBiddingItems = [];
    },
    getMyBiddingItemsSuccess(state, action) {
      state.loading = false;
      state.myBiddingItems = action.payload;
    },
    getMyBiddingItemsFailed(state, action) {
      state.loading = false;
      state.myBiddingItems = [];
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
    republishBiddingItemRequest(state, action) {
      state.loading = true;
    },
    republishBiddingItemSuccess(state, action) {
      state.loading = false;
    },
    republishBiddingItemFailed(state, action) {
      state.loading = false;
    },
    
    resetSlice(state, action) {
      state.loading = false;
      state.itemDetails = state.itemDetails;
      state.biddingDetails = state.biddingDetails;
      state.biddingItemBidders = state.biddingItemBidders;
      state.myBiddingItems = state.myBiddingItems;
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

export const createBiddingItem = (data) => async (dispatch) => {
  dispatch(biddingSlice.actions.createBiddingItemRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/biddingitem/create",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(biddingSlice.actions.createBiddingItemSuccess());
    toast.success(response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  } catch (error) {
    dispatch(biddingSlice.actions.createBiddingItemFailed());
    toast.error(error.response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  }
};

export const getMyBiddingItems = () => async(dispatch) => {
  dispatch(biddingSlice.actions.getMyBiddingItemsRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/biddingitem/allitems",
      {
        withCredentials: true,
      }
    );
    dispatch(biddingSlice.actions.getMyBiddingItemsSuccess(response.data.items));
    dispatch(biddingSlice.actions.resetSlice());
  } catch (error) {
    dispatch(biddingSlice.actions.getMyBiddingItemsFailed());
    toast.error(error.response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  }
}

export const deleteBiddingItem = (id) => async (dispatch) => {
  dispatch(biddingSlice.actions.deleteBiddingItemRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/biddingitem/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(biddingSlice.actions.deleteBiddingItemSuccess());
    toast.success(response.data.message);
    dispatch(getAllBiddingItems());
    dispatch(getMyBiddingItems());
    dispatch(biddingSlice.actions.resetSlice());
  } catch (error) {
    dispatch(biddingSlice.actions.deleteBiddingItemFailed());
    toast.error(error.response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  }
};

export const republishBiddingItem = (id,data) => async (dispatch) => {
  dispatch(biddingSlice.actions.republishBiddingItemRequest());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/biddingitem/item/republish/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(biddingSlice.actions.republishBiddingItemSuccess());
    toast.success(response.data.message);
    dispatch(getAllBiddingItems());
    dispatch(getMyBiddingItems());
    dispatch(biddingSlice.actions.resetSlice());
  } catch (error) {
    dispatch(biddingSlice.actions.republishBiddingItemFailed());
    toast.error(error.response.data.message);
    dispatch(biddingSlice.actions.resetSlice());
  }
}

export default biddingSlice.reducer;
