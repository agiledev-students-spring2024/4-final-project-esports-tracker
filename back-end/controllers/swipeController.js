const assert = require('assert')
const { default: mongoose } = require('mongoose');
const User = mongoose.model('user')
const jwt = require('jsonwebtoken');
const { use } = require('chai');
require('dotenv').config()


// async function addBothMatchedField() {
//   try {

//     // Find all users
//     const users = await User.find()

//     // Add the bothMatched field to each user document
//     for (const user of users) {
//       user.bothMatched = []
//       await user.save()
//     }

//     console.log('BothMatched field added to all users')
//   } catch (error) {
//     console.error('Error adding bothMatched field:', error)
//   } 
// }

// addBothMatchedField()

  const postSwipe = async (req, res) => {
    try {
      console.log(req.body);
      assert(typeof req.body.dir === 'string', 'Invalid or missing "dir" value in the request body')
      const { dir, cardData, idx } = req.body
      const { _id: userId, matchedUsers } = cardData
  
      // Get the user being swiped on
      const otherUserId = req.user._id
  
      if (dir === 'right') {
        const isMatch = matchedUsers.includes(userId)
  
        if (isMatch) {
          return res.status(200).json({ message: 'It\'s a match!' })
        } else {
          await User.findByIdAndUpdate(userId, { $push: { matchedUsers: otherUserId } })
          return res.status(200).json({ message: 'Swiped right. Added to matched users.' })
        }
      } 


      else if (dir === 'left') {
        await User.findByIdAndUpdate(otherUserId, { $pull: { matchedUsers: userId } })
        return res.status(200).json({ message: 'Swiped left. Removed from matched users.' })
      }
      else {
        return res.status(400).json({ error: 'Invalid swipe direction.' })
      }
    } catch (error) {
      console.error('Error handling swipe:', error);
      res.status(500).json({ error: 'Internal server error' })
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

const postMatch = async (req, res) => { //NEED TO CHANGE
  try {
    console.log(req.body)
    const { matchedUser } = req.body;

    // Find the current user by _id
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' });
    }
    // Add the _id of the matched user to the bothMatched array of the current user
    currentUser.bothMatched.push(matchedUser._id);
    await currentUser.save();

    // Add the _id of the current user to the bothMatched array of the matched user
    matchedUser.bothMatched.push(currentUser._id);
    await matchedUser.save();

    res.status(200).json({ message: 'Match handled successfully' });
  } catch (error) {
    console.error('Error handling match:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getCard, postSwipe, postMatch }
