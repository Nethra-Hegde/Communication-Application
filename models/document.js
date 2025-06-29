const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  label: { type: String, required: true },
  fileName: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", documentSchema);