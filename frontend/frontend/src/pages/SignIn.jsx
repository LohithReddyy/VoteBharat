import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignIn({ setIsLoggedIn, setUsername }) {
  const [credentials, setCredentials] = useState({ aadharNumber: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('username', data.name);

        setIsLoggedIn(true);
        setUsername(data.name);

        Swal.fire('Success', 'Login Successful', 'success');
        navigate('/');
      } else {
        Swal.fire('Error', data.message || 'Login Failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Network Error', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">Sign In</h2>

        {/* Aadhar Number Input */}
        <div className="relative mb-4">
          <FontAwesomeIcon icon={faIdCard} className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="aadharNumber"
            placeholder="Aadhar Number"
            value={credentials.aadharNumber}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-10 p-2 border rounded"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
