
const assert = require('assert')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose');
const User = mongoose.model('user')
const jwt = require('jsonwebtoken');
require('dotenv').config()



const getProfile = async (req, res) => {
  try {
      const userId = req.user._id; // Assuming the user ID is available in req.user._id
      
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        username: user.username,
        bio: user.bio,
        email: user.email,
        pfp: `https://urchin-app-n5bks.ondigitalocean.app/final-project-pet-tinder-back-en/${user.pfp}`,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getEditProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in req.user._id
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      bio: user.bio,
      email: user.email,
      pfp: `https://urchin-app-n5bks.ondigitalocean.app/final-project-pet-tinder-back-en/${user.pfp}`,
      preferences: user.preferences.pet
    });
  } catch (error) {
    console.error('Error fetching user edit profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



const postEditProfile = async(req, res) => {
  try {
    const { username, bio, email, preferences } = req.body;
    const image = req.file.path; 
    
    const userId = req.user._id;
    
    // Update the user information
    await User.findByIdAndUpdate(userId, {
      username,
      bio,
      email,
      pfp: image,
      preferences: preferences,
    });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

  
  module.exports = { getProfile, getEditProfile, postEditProfile,  }
