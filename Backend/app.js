const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const amplifierRoutes = require('./routes/amplifierRoutes');
const saleRoutes = require('./routes/saleRoutes');
const billRoutes = require('./routes/billRoutes');
const reportRoutes = require('./routes/reportRoutes'); // For monthly report

// Load environment variables
dotenv.config();

// Debug: Check if MONGO_URI is loaded
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/amplifiers', amplifierRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/reports', reportRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
