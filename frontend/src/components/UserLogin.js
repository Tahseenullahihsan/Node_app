import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserLogin.css'; // Importing CSS for styles

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      alert('Login successful!');
      console.log('User logged in:', response.data);

      // Save token in local storage
      localStorage.setItem('token', response.data.token);

      // Clear the form
      setFormData({ email: '', password: '' });

      // Redirect to UserList page after successful login
      navigate('/'); // Change '/userlist' to the path of your UserList page
    } catch (error) {
      console.error('Error logging in:', error);
      const errorMessage = error.response?.data?.message || 'Invalid login credentials.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/996/157/small_2x/amp-logo-amp-letter-amp-letter-logo-design-initials-amp-logo-linked-with-circle-and-uppercase-monogram-logo-amp-typography-for-technology-business-and-real-estate-brand-vector.jpg"
          alt="Amp Logo"
          className="login-logo"
        />
        <h1>Welcome to Amplifier</h1>
        <h3>User Login</h3>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
