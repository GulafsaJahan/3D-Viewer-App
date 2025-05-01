// controllers/stateController.js
const State = require('../models/State');

// Save the state for a user
exports.saveState = async (req, res) => {
  try {
    const state = await State.findOneAndUpdate(
      { user: req.user.id },
      { cameraPosition: req.body.cameraPosition },
      { new: true, upsert: true }
    );
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the state for a user
exports.getState = async (req, res) => {
  try {
    const state = await State.findOne({ user: req.user.id });
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
