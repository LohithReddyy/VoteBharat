import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaIdCard, FaBirthdayCake, FaVenusMars, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    aadharNumber: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully!',
          text: 'You can now log in to your account.',
          timer: 2000, // Auto close after 2 seconds
          showConfirmButton: false,
        }).then(() => {
          navigate('/signin');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sign Up Failed!',
          text: data.message || 'Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error!',
        text: 'Please check your internet connection and try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 font-[Poppins] pt-16">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm pt-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border rounded-md p-3 bg-gray-100">
            <FaUser className="text-gray-600 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Aadhar Number */}
          <div className="flex items-center border rounded-md p-3 bg-gray-100">
            <FaIdCard className="text-gray-600 mr-3" />
            <input
              type="text"
              name="aadharNumber"
              placeholder="Aadhar Number"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Age */}
          <div className="flex items-center border rounded-md p-3 bg-gray-100">
            <FaBirthdayCake className="text-gray-600 mr-3" />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center border rounded-md p-3 bg-gray-100">
            <FaVenusMars className="text-gray-600 mr-3" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-md p-3 bg-gray-100 relative">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-md p-3 bg-gray-100 relative">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
            <div
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
