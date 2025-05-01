const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

// File filter (only allow .obj and .glb)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.obj', '.glb'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .obj and .glb files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Upload route
router.post('/upload', upload.single('model'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file type' });
  }

  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url: fileUrl }); // 👈 This is used by the frontend viewer
});

module.exports = router;
