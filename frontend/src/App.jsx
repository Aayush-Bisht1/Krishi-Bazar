import { useState } from 'react'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Hero from './components/Hero'
import Workflow from './components/Workflow'
import Footer from './components/Footer'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Hero/><Workflow/><Footer/></>}/> 
      </Routes>
    </Router>
  )
}

export default App
