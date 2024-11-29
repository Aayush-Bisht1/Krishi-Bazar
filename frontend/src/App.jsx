import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import LandingPage from './components/LandingPage'
import FarmerDashBoard from './components/FarmerDashBoard'
import BuyerDashBoard from './components/BuyerDashBoard'
import SuperAdminDashBoard from './components/SuperAdminDashBoard'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/> 
        <Route path="/farmer" element={<FarmerDashBoard/>}/> 
        <Route path="/buyer" element={<BuyerDashBoard/>}/> 
        <Route path="/superadmin" element={<SuperAdminDashBoard/>}/> 
      </Routes>
    </Router>
  )
}

export default App
