const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { register, login, getProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Multer setup for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profilePics/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// Register route
router.post('/register', upload.single('profilePic'), register);

// Login route
router.post('/login', login);

// Profile route (requires token)
router.get('/profile', verifyToken, getProfile);

module.exports = router;
