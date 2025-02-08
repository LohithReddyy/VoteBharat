import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import your existing Navbar component
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

import votingImg1 from "../assets/voting1.jpg";
import votingImg2 from "../assets/herobg.jpg";
import votingImg3 from "../assets/voting3.jpg";
import votingImg4 from "../assets/voting4.jpg";
import votingImg5 from "../assets/voting5.jpg";
import heroBg from "../assets/herobg1.jpg";

function Home() {
  const navigate = useNavigate();
  const taglines = [
    "Empowering Democracy, One Vote at a Time!",
    "Your Vote, Your Power!",
    "Secure. Transparent. Digital Voting.",
    "Vote Anywhere, Anytime – The Future of Elections!",
  ];

  const fullText = "Welcome to VoteBharat!";
  const [text, setText] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(taglines[0]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: false });

    if (!fadeOut) {
      setText(fullText);
      setTimeout(() => setFadeOut(true), 2500);
    }
  }, [fadeOut]);

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTagline((prev) => {
        const nextIndex = (taglines.indexOf(prev) + 1) % taglines.length;
        return taglines[nextIndex];
      });
    }, 3000);

    return () => clearInterval(taglineInterval);
  }, []);

  return (
    <>
      {/* Navbar (Always Visible with AOS Fade-In Animation) */}
      <div data-aos="fade-down" data-aos-duration="1000">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-white px-4">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-155"
          style={{ backgroundImage: `url(${heroBg})` }}
          data-aos="fade-down"
          data-aos-duration="2500"
        ></div>

        <div 
  className="relative z-10 w-full xl:w-1/2 text-left space-y-5 px-4 xl:px-6" 
  data-aos="fade-up" 
  data-aos-duration="2000"
>
  <h1 
    className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-5xl font-bold text-orange-500 
               transition-all duration-1000 ease-in 
               w-full max-w-full break-words overflow-hidden leading-tight 
               whitespace-normal xl:whitespace-nowrap text-wrap balance"
  >
   <span className="text-orange-500">Welcome to</span> 
   <span className="text-white"> VoteBharat!</span>
  </h1>
  <p 
    className="text-xl sm:text-2xl text-white 
               w-full max-w-full break-words overflow-hidden leading-tight whitespace-normal text-wrap balance"
  >
    {currentTagline}
  </p>
  <button
    onClick={() => navigate("/signup")}
    className="mt-6 bg-green-800 text-black px-6 py-3 rounded-md flex items-center gap-2 
               hover:bg-green-500 transition-all ease-in-out"
    data-aos="fade-up"
    data-aos-duration="2000"
  >
    Get Started <FontAwesomeIcon icon={faArrowRight} />
  </button>
</div>

      </div>

      {/* Dynamic Sections */}
      <div className="px-6 py-20 w-full max-w-full overflow-hidden">

        {/* Section 1 - Why Digital Voting */}
        <section data-aos="fade-down-right" className="flex flex-col md:flex-row items-center gap-8 w-full max-w-full overflow-hidden">
          <img src={votingImg1} alt="Voting Process" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Why Digital Voting?</h2>
            <p className="text-lg text-black mt-3">
              Digital voting ensures transparency, accessibility, and security. Participate from anywhere and make your vote count!
            </p>
          </div>
        </section>

        {/* Section 2 - Secure & Reliable */}
        <section data-aos="fade-up-right" className="flex flex-col md:flex-row-reverse items-center gap-8 w-full max-w-full overflow-hidden">
          <img src={votingImg2} alt="Secure Voting" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Secure & Reliable</h2>
            <p className="text-lg text-black mt-3">
              End-to-end encryption, multi-factor authentication, and blockchain-backed votes ensure a tamper-proof election system.
            </p>
          </div>
        </section>

        {/* Section 3 - Get Involved */}
        <section data-aos="fade-down-right" className="flex flex-col md:flex-row items-center gap-8 w-full max-w-full overflow-hidden">
          <img src={votingImg3} alt="Voting Awareness" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Get Involved Today!</h2>
            <p className="text-lg text-black mt-3">
              Be part of a digital revolution in democracy. Sign up and vote securely from anywhere in the world.
            </p>
          </div>
        </section>

        {/* Section 4 - Inclusive & Accessible */}
        <section data-aos="fade-up-right" className="flex flex-col md:flex-row-reverse items-center gap-8 w-full max-w-full overflow-hidden">
          <img src={votingImg4} alt="Inclusive & Accessible" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Inclusive & Accessible</h2>
            <p className="text-lg text-black mt-3">
              Designed for everyone, VoteBharat ensures equal participation for all citizens, regardless of location or ability.
            </p>
          </div>
        </section>

        {/* Section 5 - Real-Time Vote Counting */}
        <section data-aos="fade-down-right" className="flex flex-col md:flex-row items-center gap-8 w-full max-w-full overflow-hidden">
          <img src={votingImg5} alt="Real-Time Vote Counting" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Real-Time Vote Counting</h2>
            <p className="text-lg text-black mt-3">
              Say goodbye to long wait times! Digital voting provides real-time vote counting for quick and reliable results.
            </p>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#1E212B] text-white py-8 text-center">
        <div className="container mx-auto px-6">

          {/* Quick Links */}
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-3 flex justify-center space-x-6 text-lg flex-wrap">
            <li><a href="/about" className="hover:text-gray-400 transition duration-300">About Us</a></li>
            <li><a href="/signup" className="hover:text-gray-400 transition duration-300">Sign Up</a></li>
            <li><a href="/contact" className="hover:text-gray-400 transition duration-300">Contact Us</a></li>
          </ul>

          {/* Social Media Icons */}
          <div className="mt-6 flex justify-center space-x-6 text-2xl flex-wrap">
            <a href="https://facebook.com" className="hover:text-gray-400 transition duration-300"><FaFacebookF /></a>
            <a href="https://twitter.com" className="hover:text-gray-400 transition duration-300"><FaTwitter /></a>
            <a href="https://linkedin.com" className="hover:text-gray-400 transition duration-300"><FaLinkedinIn /></a>
            <a href="https://github.com" className="hover:text-gray-400 transition duration-300"><FaGithub /></a>
            <a href="https://instagram.com" className="hover:text-gray-400 transition duration-300"><FaInstagram /></a>
          </div>

          {/* Address */}
          <p className="mt-4 text-gray-300 text-sm">KL University, Vijayawada, Andhra Pradesh</p>

          {/* Copyright */}
          <p className="mt-2 text-gray-400 text-sm">&copy; {new Date().getFullYear()} VoteBharat. All rights reserved.</p>

        </div>
      </footer>
    </>
  );
}

export default Home;
