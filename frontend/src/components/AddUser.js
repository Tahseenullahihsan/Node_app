import React, { useState } from 'react';
import './AddUser.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from 'react-icons/fa'; // Importing icons

import { addUser } from '../services/userService';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      
      alert('User added successfully!');
      
      setFormData({ name: '', email: '', password: '', phone: '' });
  // Redirect to UserList page after successful login
  navigate('/'); // Change '/userlist' to the path of your UserList page
 
      console.log('Response:', response.data); // Logging response from the server
    } catch (error) {
      console.error('Error adding user:', error);
  
      const errorMessage = error.response?.data?.message || 'Failed to add user.';
      alert(errorMessage);
    }
  };
  

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaPhoneAlt className="icon" />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
