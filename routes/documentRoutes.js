const express = require('express');
const multer = require('multer');
const Document = require('../models/document');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { label, uploadedBy } = req.body;
    console.log('UPLOAD ROUTE HIT', req.body, req.file);

    if (!req.file || !label || !uploadedBy) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const doc = await Document.create({
      label,
      fileName: req.file.filename,
      uploadedBy
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

router.get('/', async (req, res) => {
  const docs = await Document.find().sort({ uploadedAt: -1 });
  res.json(docs);
});

module.exports = router;