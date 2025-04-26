const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your user model (ensure it's properly defined)

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Example: Check if the user exists and password matches
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check password (simplified; implement secure password check in production)
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Send user data (or token in a real app)
  res.status(200).json(user);
});

// You can add other user-related routes (register, fetch user, etc.)

module.exports = router;
