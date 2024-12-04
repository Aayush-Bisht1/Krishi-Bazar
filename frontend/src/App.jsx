import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import FarmerDashBoard from "./pages/FarmerDashBoard";
import BuyerDashBoard from "./pages/BuyerDashBoard";
import SuperAdminDashBoard from "./pages/SuperAdminDashBoard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import MarketPlace from "./components/MarketPlace";
import BiddingItem from "./pages/biddingItem";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/farmer/dashboard"  element={<ProtectedRoute allowedRoles={["farmer"]}><FarmerDashBoard /></ProtectedRoute>} />
        <Route path="/buyer/dashboard" element={<ProtectedRoute allowedRoles={["buyer"]}><BuyerDashBoard /></ProtectedRoute>} />
        <Route path="/superadmin" element={<ProtectedRoute allowedRoles={["superadmin"]}><SuperAdminDashBoard /></ProtectedRoute>} />
        <Route path="/signup/:text" element={<SignUp />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/bidding/item/:id" element={<ProtectedRoute allowedRoles={["buyer"]}><BiddingItem /></ProtectedRoute>} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;
