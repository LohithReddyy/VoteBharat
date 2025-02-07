import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Parties from './pages/Parties';
import Voting from './pages/Voting';
import ContactUs from './pages/Contactus';
import AboutUs from './pages/AboutUs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedAadhar = localStorage.getItem('aadharNumber');
    if (token && storedAadhar) {
      setIsLoggedIn(true);
      setAadharNumber(storedAadhar);

      // Fetch name based on Aadhar number
      const users = JSON.parse(localStorage.getItem("users")) || {};
      setUsername(users[storedAadhar] || "User");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 username={username} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setAadharNumber={setAadharNumber} />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
