import React from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <Link to="/">Home</Link>
        {isAdmin ? (
          <>
            <Link to="/voters">Voters</Link>
            <Link to="/parties">Parties</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/aboutus">About Us</Link>
            <Link to="#" onClick={() => setIsAdmin(false)}>Signin/Signup</Link>
            <Link to="/admin-login">Admin Login</Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
