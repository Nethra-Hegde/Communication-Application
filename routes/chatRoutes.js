const express = require('express');
const Chat = require('../models/chat');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user, message } = req.body;
    if (!user || !message) {
        return res.status(400).json({ message: 'User and message required' });
    }

    try {
        const chat = await Chat.create({ user, message });
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Failed to save chat', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ time: 1 });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get chats', error: err.message });
    }
});

module.exports = router;
