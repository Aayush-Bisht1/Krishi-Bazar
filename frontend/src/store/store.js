import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import commissionReducer from "./slices/commissionSlice";
import biddingReducer from "./slices/biddingSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        commission: commissionReducer,
        bidding: biddingReducer
    },
})