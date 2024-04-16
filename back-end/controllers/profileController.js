const assert = require('assert');
const { default: mongoose } = require('mongoose');
const User = mongoose.model('user')

const userProfile = {
    username: 'Tony_Gunk',
    bio: 'This is a bio lorem ipsum blah blah I like to walk my dog and feed my dog. I also love cats but I love dogs more. I live in NYC.',
    pfp: 'https://picsum.photos/id/237/200/300',
    email: 'temp@email',
    preferences: {
      breed: 'dog'
    },
  };

const getProfile = async (req, res) => {
    res.json(userProfile);
  };

const getEditProfile = (req, res) => {
    res.json(userProfile);
}
const postEditProfile = (req, res) => {
    try{
        const { username, bio, pfp, email, preferences } = req.body;
    
    
      // Update the profile
        userProfile.username = username
        userProfile.bio = bio || userProfile.bio;
        userProfile.pfp = pfp || userProfile.pfp;
        userProfile.email = email || userProfile.email;
        userProfile.preferences = preferences || userProfile.preferences;
      
        res.status(200).json({ message: 'Profile updated', profile: userProfile });
    } 
    catch (error) {
      console.error('error updating profile:', error);
      res.status(500).json({error: 'internal serv error'});
    
    }
}

  
  module.exports = { getProfile, getEditProfile, postEditProfile,  }
