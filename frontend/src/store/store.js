import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import commissionReducer from "./slices/commissionSlice";
import biddingReducer from "./slices/biddingSlice";
import bidReducer from "./slices/bidSlice";
import superAdminReducer from "./slices/superAdminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        commission: commissionReducer,
        bidding: biddingReducer,
        bid: bidReducer,
        superAdmin: superAdminReducer
    },
})