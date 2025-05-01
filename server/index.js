const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const modelRoutes = require('./routes/model');
const stateRoutes = require('./routes/state');

dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/profilePics', express.static(path.join(__dirname, 'uploads/profilePics')));

// MongoDB connection using MONGO_URL from .env file
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/model', modelRoutes);
app.use('/api/state', stateRoutes);


// Start the server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
