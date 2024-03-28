const express = require('express');
const axios = require('axios');
const router = express.Router();

// Mock data
const userProfile = {
  username: 'Tony_Gunk',
  bio: 'This is a bio lorem ipsum blah blah I like to walk my dog and feed my dog. I also love cats but I love dogs more. I live in NYC.',
  pfp: 'https://picsum.photos/id/237/200/300',
  email: 'temp@email',
  preferences: {
    breed: 'dog'
  },
};

// Route to get user profile
router.get('/profile', (req, res) => {
  res.json(userProfile);
});

// Route to update user profile
router.post('/editProfile', (req, res) => {
  const { username, bio, pfp, email, preferences } = req.body;
  try {
    console.log(req.body);
  // Send a success response
  res.status(200).json({ message: 'Data received successfully' });
} catch (error) {
  console.error('Error handling out of frame data:', error, req.body);
  res.status(500).json({ error: 'Internal server error' });
}
  // Update the profile
  userProfile.username = username
  userProfile.bio = bio || userProfile.bio;
  userProfile.pfp = pfp || userProfile.pfp;
  userProfile.email = email || userProfile.email;
  userProfile.preferences = preferences || userProfile.preferences;
  
  res.json({ message: 'Profile updated', profile: userProfile });
});

module.exports = router;
