import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faHome,
  faPhone,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faVoteYea,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logoo.png";

function Navbar({ isLoggedIn, username, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    Swal.fire("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav
      data-aos="fade-down"
      className="bg-[#1E212B] text-white p-3 flex justify-between items-center shadow-lg fixed top-0 left-0 w-full max-w-full z-50 overflow-x-hidden"
    >
      <div className="flex items-center space-x-3">
        <img src={logo} alt="VoteBharat Logo" className="h-10" />
        <span className="text-2xl font-bold">VoteBharat</span>
      </div>

      <div className="flex items-center space-x-6 ml-auto">
      <Link to="/" className="hover:text-gray-300 flex items-center space-x-2">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>

        {isLoggedIn ? (
          <>
          
            <Link to="/voting" className="hover:text-gray-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faVoteYea} />
              <span>Vote</span>
            </Link>
           
            <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-gray-300">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/contact" className="hover:text-gray-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>Contact Us</span>
            </Link>
            <Link to="/signup" className="hover:text-gray-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Sign Up</span>
            </Link>
            <Link to="/signin" className="hover:text-gray-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Sign In</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
