const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cameraPosition: Object,
});
module.exports = mongoose.model('State', stateSchema);