import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/Home';
import LoginPopup from './components/LoginPopup/LoginPopup';
import AboutUs from './pages/AboutUs/AboutUs';
import AdminLogin from './components/admin/adminlogin';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    toast.success("Logged out successfully!"); // Show toast message on logout
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} isAdmin={isAdmin} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
