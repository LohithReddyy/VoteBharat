import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import { assets } from '../../assets/assets';

const quotes = [
  "Your vote, your voice, your power.",
  "A stronger democracy begins with you.",
  "Make every vote count, shape the future.",
  "India thrives when we participate.",
  "Empower change, vote today!"
];

const Home = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="overlay-content">
        <h1 className="title">Welcome to VoteBharat</h1>
        <p className="quote">{quotes[quoteIndex]}</p>
      </div>
      <div className="image-container">
        <img src={assets.ind_map_nobg} alt="Decorative" />
      </div>
    </div>
  );
};


export default Home;
