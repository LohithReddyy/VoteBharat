    import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./adminLogin.css";

const AdminLogin = ({ setIsAdmin }) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ aadharNumber, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("adminToken", data.token);
      setIsAdmin(true); // Updates navbar dynamically
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      response.status === 400
        ? toast.error(data.error)
        : toast.error("Invalid credentials");
    }
   
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Aadhar Number"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
