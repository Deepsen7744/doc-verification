import {Route, Routes} from "react-router-dom";
import GovDashboard from "./components/Goverment/GovDashboard";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Home/Dashboard";
import Login from "./components/Home/Login";
import Navbar from "./components/Home/Navbar";
import Signup from "./components/Home/Signup";
import InstDashboard from "./components/Institute/InstDashboard";
import StudDashboard from "./components/Student/StudDashboard";
import Verification from "./components/Verification/Verification";
import "./App.css";
const dotenv = require("dotenv");

dotenv.config();

function App() {

  return (
    <div>
    <Navbar/>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/goverment" element={<GovDashboard/>}/>
        <Route path="/dashboard/institute" element={<InstDashboard/>}/>
        <Route path="/dashboard/student" element={<StudDashboard/>}/>
        <Route path="/verification" element={<Verification/>}/>   
    </Routes>
    </div>
  );
}

export default App;
