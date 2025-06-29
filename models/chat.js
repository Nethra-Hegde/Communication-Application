const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);
