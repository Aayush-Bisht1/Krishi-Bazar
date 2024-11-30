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
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    clearAllErrors(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
  },
});

export const register = (formData) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
      // Validate required fields before making the request
      if (!formData.get('userName') || !formData.get('email') || !formData.get('password') || 
          !formData.get('address') || !formData.get('phoneNo') || !formData.get('role') || 
          !formData.get('profileImage')) {
        throw new Error('Please fill all required fields');
      }
  
      // Additional validation for farmer role
      if (formData.get('role') === 'farmer') {
        if (!formData.get('bankAccountNumber') || !formData.get('bankAccountName') || 
            !formData.get('bankName') || !formData.get('razorPayId')) {
          throw new Error('Please fill all bank details for farmer registration');
        }
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      dispatch(userSlice.actions.registerSuccess(response.data));
      toast.success(response.data.message);
    } catch (error) {
      dispatch(userSlice.actions.registerFailed());
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(errorMessage);
    }
  };
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export default userSlice.reducer;
