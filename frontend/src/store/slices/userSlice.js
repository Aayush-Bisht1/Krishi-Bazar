import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    signupRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    signupFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const signup = (data) => async (dispatch) => {
  dispatch(userSlice.actions.signupRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data && response.data.user) {
      dispatch(userSlice.actions.signupSuccess(response.data));
      toast.success(response.data.message || "SignUp successful");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    dispatch(userSlice.actions.signupFailed());
    toast.error(error.response?.data?.message || "SignUp failed");

  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data && response.data.user) {
      dispatch(userSlice.actions.loginSuccess(response.data));
      toast.success(response.data.message || "Login successful");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response?.data?.message || "Login failed");
  }
};
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      { 
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
       }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message || "Logout successful");
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message || "Logout failed");
  }
};
export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      { 
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
       }
    );
    dispatch(userSlice.actions.fetchUserSuccess());
    toast.success(response.data.message || "Logout successful");
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    toast.error(error.response.data.message || "Logout failed");
  }
};

export default userSlice.reducer;
