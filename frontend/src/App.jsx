import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./components/LandingPage";
import FarmerDashBoard from "./components/FarmerDashBoard";
import BuyerDashBoard from "./components/BuyerDashBoard";
import SuperAdminDashBoard from "./components/SuperAdminDashBoard";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/farmer/dashboard" element={<FarmerDashBoard />} />
        <Route path="/buyer/dashboard" element={<BuyerDashBoard />} />
        <Route path="/superadmin" element={<SuperAdminDashBoard />} />
        <Route path="/signup/:text" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;
