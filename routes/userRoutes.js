const express = require('express');
const router = express.Router();
const User = require('../models/users');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET single user
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST Register user
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ fullName, email, password });
  res.status(201).json(user);
});

// POST Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  res.json(user);
});

// PUT Edit
router.put('/:id', async (req, res) => {
  const { fullName, email } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { fullName, email }, { new: true });
  res.json(user);
});

// DELETE User
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;