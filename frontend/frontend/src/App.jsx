import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Voting from "./pages/Voting";
import AboutUs from "./pages/AboutUs";
import Results from "./pages/Results";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactUs from "./pages/ContactUs";


function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userToken"));
  const [username, setUsername] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedAadhar = localStorage.getItem("aadharNumber");

    if (token && storedAadhar) {
      setIsLoggedIn(true);
      setAadharNumber(storedAadhar);
      const users = JSON.parse(localStorage.getItem("users")) || {};
      setUsername(users[storedAadhar] || "User");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/home2");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn && ["/home2", "/voting", "/results"].includes(window.location.pathname)) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }
  }, [isLoggedIn]);
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setAadharNumber={setAadharNumber} />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/home2" element={<Home2 username={username} />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </div>
  );
}



export default App;
