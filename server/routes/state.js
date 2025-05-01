// routes/state.js
const express = require('express');
const router = express.Router();

// Import the controller functions
const { saveState, getState } = require('../controllers/stateController');

// Define the routes and associate them with the correct controller functions
router.post('/saveState', saveState); // POST request to save the state
router.get('/getState', getState);    // GET request to fetch the state

module.exports = router;
