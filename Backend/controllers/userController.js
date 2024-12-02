const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // This will return all users from the User collection
  
      // Check if there are any users
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found.' });
      }
  
      res.status(200).json(users); // Return the users as a JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };