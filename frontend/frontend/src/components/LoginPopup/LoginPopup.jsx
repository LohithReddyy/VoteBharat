import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const navigate = useNavigate();

    const initialFormState = {
        name: "",
        aadharNumber: "",
        age: "",
        gender: "",
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState(initialFormState);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currState === "Sign Up") {
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match!");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/users/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success("Account Created Successfully!");
                    setFormData(initialFormState);
                    setCurrState("Login");
                } else {
                    toast.error(data.message || "Signup Failed");
                }
            } catch (error) {
                toast.error("Server Error! Please try again.");
            }
        } else {
            try {
                const response = await fetch("http://localhost:5000/users/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        aadharNumber: formData.aadharNumber,
                        password: formData.password,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success("Login Successful!");
                    navigate("/home");
                    setFormData({ aadharNumber: "", password: "" });
                } else {
                    toast.error(data.message || "Invalid credentials!");
                }
            } catch (error) {
                toast.error("Server Error! Please try again.");
            }
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        </>
                    )}

                    <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} required />

                    {currState === "Sign Up" && (
                        <>
                            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </>
                    )}

                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                    {currState === "Sign Up" && (
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                    )}
                </div>

                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                <p onClick={() => {
                    setCurrState(currState === "Login" ? "Sign Up" : "Login");
                    setFormData(initialFormState);
                }}>
                    {currState === "Login" ? "New user? Sign Up" : "Already have an account? Login"}
                </p>
            </form>
        </div>
    );
};

export default LoginPopup;
