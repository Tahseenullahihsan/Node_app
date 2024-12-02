import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, } from 'react-icons/fa'; // Importing icons
import './UserList.css'; // Importing the CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [amplifiers, setAmplifiers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAmplifiers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/amplifiers/all');
        setAmplifiers(response.data);
      } catch (error) {
        console.error('Error fetching amplifiers:', error);
        setError('Failed to fetch amplifiers.');
      }
    };

    fetchAmplifiers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="user-list-container">
      <div className="header">
        <h1>User List</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="users-section">
        <h2>Users</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
             
              <div className="user-details">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="amplifiers-section">
       
        <ul className="amplifier-list">
          {amplifiers.map((amplifier) => (
            <li key={amplifier._id} className="amplifier-item">
              <div className="amplifier-icon">
               
              </div>
              <div className="amplifier-details">
                <p className="amplifier-name">{amplifier.name}</p>
                <p className="amplifier-brand">Brand: {amplifier.brand}</p>
                <p className="amplifier-price">Price: ${amplifier.price}</p>
                <p className="amplifier-quantity">Quantity: {amplifier.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
