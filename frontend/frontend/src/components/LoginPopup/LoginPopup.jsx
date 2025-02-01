import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation
import { assets } from '../../assets/assets';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const navigate = useNavigate(); // Hook for navigation

    // Initial form state
    const initialFormState = {
        name: "",
        aadharNumber: "",
        age: "",
        gender: "",
        password: "",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currState === "Sign Up") {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            alert("Account Created Successfully!");

            // Reset form and switch to login
            setFormData(initialFormState);
            setCurrState("Login");
        } else {
            alert("Login Successful!");
            navigate('/home2'); // Redirect to Home2 page

            // Reset login form
            setFormData({ aadharNumber: "", password: "" });
        }
    };

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </>
                    )}

                    <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={formData.aadharNumber} onChange={handleChange} required />
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
                    setFormData(initialFormState); // Reset form when switching
                }}>
                    {currState === "Login" ? "New user? Sign Up" : "Already have an account? Login"}
                </p>
            </form>
        </div>
    );
};

export default LoginPopup;
