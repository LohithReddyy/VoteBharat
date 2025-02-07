import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home2({ isLoggedIn }) {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [username, setUsername] = useState("");
  const storedAadhar = localStorage.getItem("aadharNumber");

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-in-out", once: false });

    if (!fadeOut) {
      const timer = setTimeout(() => setFadeOut(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  // Fetch name from the backend
  useEffect(() => {
    const fetchUsername = async () => {
      if (storedAadhar) {
        try {
          const response = await fetch("http://localhost:5000/user/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aadharNumber: storedAadhar }),
          });

          const data = await response.json();

          if (response.ok) {
            setUsername(data.name);
          } else {
            console.error("Error fetching name:", data.message);
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      }
    };

    fetchUsername();
  }, [storedAadhar]);

  return (
    <>
      {/* Navbar with animation */}
      <div data-aos="fade-down">
        <Navbar isLoggedIn={isLoggedIn} name={username} />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen w-full bg-white text-center space-y-8">
        <h1 
          className="text-4xl md:text-6xl font-bold text-orange-500"
          data-aos="fade-up"
        >
          {isLoggedIn ? `Welcome, ${username || "User"}!` : "Welcome to VoteBharat!"}
        </h1>

        <button
          onClick={() => navigate("/voting")}
          className="bg-green-800 text-black px-6 py-3 rounded-md flex items-center gap-2 hover:bg-green-500 transition-all ease-in-out"
          data-aos="zoom-in"
        >
          {isLoggedIn ? "Start Voting" : "Vote"}
        </button>
      </div>
    </>
  );
}

export default Home2;
