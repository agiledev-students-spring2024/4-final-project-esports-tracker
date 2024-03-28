const express = require('express');
const axios = require('axios');
const router = express.Router();

// Mock data
const userProfile = {
  username: 'Tony_Gunk',
  bio: 'This is a bio lorem ipsum blah blah I like to walk my dog and feed my dog. I also love cats but I love dogs more. I live in NYC.',
  pfp: 'https://picsum.photos/id/237/200/300'
};

// Route to get user profile
router.get('/profile', (req, res) => {
  res.json(userProfile);
});

// Route to update user profile
router.post('/editProfile', (req, res) => {
  const { username, bio } = req.body;

  // Update the profile
  userProfile.username = username || userProfile.username;
  userProfile.bio = bio || userProfile.bio;

  res.json({ message: 'Profile updated', profile: userProfile });
});

module.exports = router;
