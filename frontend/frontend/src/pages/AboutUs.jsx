import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUsers, FaGlobe, FaHandshake } from "react-icons/fa";
import lohithImage from "../assets/lohith.jpg"; // Import your photo
import yashImage from "../assets/yash.png";
import harshithImg from "../assets/harshith.jpg" // Import your photo

function AboutUs() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Simulating an API call or JSON file fetch
    setTimeout(() => {
      setTeam([
        { id: 1, name: "Lohith Reddy", role: "Backend", image: lohithImage },
        { id: 2, name: "Harshith Gupta", role: "Frontend", image: harshithImg },
        { id: 3, name: "Yasashwi", role: "Deployment", image: yashImage }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-[#1E212B] text-white p-6">
      {/* Hero Section */}
      <div className="text-center py-16" data-aos="fade-up">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Welcome to VoteBharat – Your trusted online voting system, ensuring transparency and security.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 text-center py-10">
        <div data-aos="fade-right" className="p-6 bg-gray-800 rounded-lg">
          <FaGlobe className="text-4xl mx-auto text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold">Our Mission</h3>
          <p className="text-gray-400 mt-2">To provide a secure and efficient online voting system.</p>
        </div>
        <div data-aos="fade-up" className="p-6 bg-gray-800 rounded-lg">
          <FaHandshake className="text-4xl mx-auto text-green-400 mb-4" />
          <h3 className="text-xl font-semibold">Our Vision</h3>
          <p className="text-gray-400 mt-2">Empowering democracy with cutting-edge technology.</p>
        </div>
        <div data-aos="fade-left" className="p-6 bg-gray-800 rounded-lg">
          <FaUsers className="text-4xl mx-auto text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold">Our Values</h3>
          <p className="text-gray-400 mt-2">Integrity, Security, and Trust.</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold" data-aos="fade-up">Meet Our Team</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-8">
          {team.length === 0 ? (
            <p className="text-gray-400">Loading team members...</p>
          ) : (
            team.map((member) => (
              <div key={member.id} data-aos="zoom-in" className="bg-gray-800 p-6 rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
