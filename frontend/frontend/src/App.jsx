import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Parties from './pages/Parties';
import Voting from './pages/Voting';
import ContactUs from './pages/Contactus';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
