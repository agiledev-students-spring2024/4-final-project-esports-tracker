const assert = require('assert')
const { default: mongoose } = require('mongoose');
const User = mongoose.model('user')
const jwt = require('jsonwebtoken');
require('dotenv').config()



  const postSwipe = async (req, res) => {
    try {
        console.log(req.body);
        assert(typeof req.body.dir === 'string', 'Invalid or missing "dir" value in the request body');

        const { dir, petId } = req.body;
        const userId = req.user._id;

        const pet = await Pet.findById(petId);
        if (!pet) {
          return res.status(404).json({ error: 'Pet not found' });
        }

        if(req.body.dir === 'left'){
            console.log('swiped left')
            Pet.updateOne({ petId: petId }, { $addToSet: { disliked: userId } }) 
            .then(result => {
              console.log("Updated pet's disliked successfully", result);
            })
            .catch(error => {
              console.error("Error updating pet's disliked", error);
             });
        }
        else if(req.body.dir === 'right'){
            console.log('swiped right')
            //add logic for match
            Pet.updateOne(
                { _id: petId },
                { $addToSet: { liked: userId } }
            )
            .then(result => {
                console.log("Updated pet's likes successfully", result);
                res.status(200).json({ message: 'Swipe right recorded successfully' });
            })
            .catch(error => {
                console.error("Error updating pet's likes", error);
                res.status(500).json({ error: 'Internal server error' });
            });
        }
      // Send a success response
      res.status(200).json({ message: 'Data received successfully' });
    } catch (error) {
      console.error('Error handling out of frame data:', error, req.body);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getCard = async (req, res) => {
  try {

    const users = await User.find()

    if (!users) {
      return res.status(404).json({ error: 'No pets found' });
    }
    const modifiedUsers = users
    .filter(users => !users.pfp.includes('picsum'))
    .map(user => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      pfp: `${req.protocol}://${req.get('host')}/${user.pfp}`, // Full URL for the profile picture
      bio: user.bio,
      matchedUsers: user.matchedUsers,
    }));

    res.json(modifiedUsers);
  } catch (error) {
    console.error('Error fetching a random pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getCard, postSwipe }
