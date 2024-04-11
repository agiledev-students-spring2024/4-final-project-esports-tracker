const express = require('express');
const axios = require('axios');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

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
  try{
    const { username, bio, pfp, email, preferences } = req.body;


  // Update the profile
    userProfile.username = username
    userProfile.bio = bio || userProfile.bio;
    userProfile.pfp = pfp || userProfile.pfp;
    userProfile.email = email || userProfile.email;
    userProfile.preferences = preferences || userProfile.preferences;
  
    res.status(200).json({ message: 'Profile updated', profile: userProfile });
} catch (error) {
  console.error('error updating profile:', error);
  res.status(500).json({error: 'internal serv error'});

}
});

module.exports = router;
