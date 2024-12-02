import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Update this if your backend is hosted elsewhere

// Get all users
export const getUsers = async () => {
  return await axios.get(API_URL);
};

// Add a new user
export const addUser = async (user) => {
  return await axios.post(API_URL, user);
};
