const Model = require('../models/Model');
exports.uploadModel = async (req, res) => {
  try {
    const model = new Model({ filename: req.file.filename, user: req.user.id });
    await model.save();
    res.status(201).json(model);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
