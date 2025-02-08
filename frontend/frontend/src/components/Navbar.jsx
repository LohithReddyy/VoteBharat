import React, { useState, useEffect } from "react";
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
  faBars,
  faTimes,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/logoo.png";

function Navbar({ isLoggedIn, username, setIsLoggedIn }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar when a link is clicked
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        data-aos="fade-down"
        className="bg-[#1E212B] text-white p-3 flex justify-between items-center shadow-lg fixed top-0 left-0 w-full max-w-full z-50 overflow-x-hidden"
      >
        <div className="flex items-center space-x-3">
          <img src={logo} alt="VoteBharat Logo" className="h-10" />
          <span className="text-2xl font-bold">VoteBharat</span>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <Link
            to={isLoggedIn ? "/home2" : "/"}
            className="hover:text-gray-300 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/voting"
                className="hover:text-gray-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faVoteYea} />
                <span>Vote</span>
              </Link>
              <Link to="/results" className="hover:text-gray-300 flex items-center space-x-2">
          <FontAwesomeIcon icon={faPoll} /> 
          <span>Results</span>
        </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/contact"
                className="hover:text-gray-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faPhone} />
                <span>Contact Us</span>
              </Link>
              <Link
                to="/signup"
                className="hover:text-gray-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/signin"
                className="hover:text-gray-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Sign In</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white"
          onClick={handleSidebarToggle}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={handleSidebarToggle}
      >
        <div
          className={`w-64 bg-[#1E212B] text-white h-full fixed top-0 right-0 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={handleSidebarToggle}
              className="text-white"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col items-start p-4 space-y-4">
            <Link
              to={isLoggedIn ? "/home2" : "/"}
              className="hover:text-gray-300 flex items-center space-x-2"
              onClick={() => handleLinkClick(isLoggedIn ? "/home2" : "/")}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/voting"
                  className="hover:text-gray-300 flex items-center space-x-2"
                  onClick={() => handleLinkClick("/voting")}
                >
                  <FontAwesomeIcon icon={faVoteYea} />
                  <span>Vote</span>
                </Link>
                <Link to="/results" className="hover:text-gray-300 flex items-center space-x-2">
          <FontAwesomeIcon icon={faPoll} /> 
          <span>Results</span>
        </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:text-gray-300"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/contact"
                  className="hover:text-gray-300 flex items-center space-x-2"
                  onClick={() => handleLinkClick("/contact")}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  <span>Contact Us</span>
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-gray-300 flex items-center space-x-2"
                  onClick={() => handleLinkClick("/signup")}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/signin"
                  className="hover:text-gray-300 flex items-center space-x-2"
                  onClick={() => handleLinkClick("/signin")}
                >
                  <FontAwesomeIcon icon={faSignInAlt} />
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
