const assert = require('assert')
const { default: mongoose } = require('mongoose')
const User = mongoose.model('user')
const Conversation = require('../models/conversation')
require('dotenv').config()

// const jwt = require('jsonwebtoken')
// const { use } = require('chai')

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
    console.log(req.body)
    assert(
      typeof req.body.dir === 'string',
      'Invalid or missing "dir" value in the request body'
    )
    const { dir, cardData, idx } = req.body

    // get the user being swiped on from their card data
    const { _id: otherUserId } = cardData

    // find the user doing the swiping (you)
    const { _id: userId, matchedUsers } = await User.findById(req.user._id)
    if (!userId) {
      return res.status(404).json({ error: 'Current user not found' })
    }

    if (dir === 'right') {
      // swiping right adds your user ID to their matchedUsers array
      await User.findByIdAndUpdate(otherUserId, {
        $push: { matchedUsers: userId },
      })

      // check if they are in your matchedUsers array (i.e. whether they swiped right on you)
      const isMatch = matchedUsers.includes(otherUserId.toString())

      if (isMatch) {
        return res.status(200).json({ message: "It's a match!" })
      } else {
        return res
          .status(200)
          .json({ message: 'Swiped right. Added to matched users.' })
      }
    } else if (dir === 'left') {
      // swiping left removes them from your matchedUsers array
      await User.findByIdAndUpdate(userId, {
        $pull: { matchedUsers: otherUserId },
      })
      return res
        .status(200)
        .json({ message: 'Swiped left. Removed from matched users.' })
    } else {
      return res.status(400).json({ error: 'Invalid swipe direction.' })
    }
  } catch (error) {
    console.error('Error handling swipe:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getCard = async (req, res) => {
  try {
    const users = await User.find()

    if (!users) {
      return res.status(404).json({ error: 'No pets found' })
    }
    const modifiedUsers = users
      .filter((users) => !users.pfp.includes('picsum'))
      .map((user) => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        pfp: `https://urchin-app-n5bks.ondigitalocean.app/final-project-pet-tinder-back-en/${user.pfp}`, // Full URL for the profile picture
        bio: user.bio,
        matchedUsers: user.matchedUsers,
      }))

    res.json(modifiedUsers)
  } catch (error) {
    console.error('Error fetching a random pet:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const postMatch = async (req, res) => {
  try {
    console.log(req.body)
    const { matchedUser } = req.body

    // Find the current user by _id
    const currentUser = await User.findById(req.user._id)
    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found' })
    }
    // await User.findByIdAndUpdate(matchedUser, {
    //   $push: { currentUser: userId },
    // })
    // create a new conversation
    const conversation = new Conversation({
      participants: [currentUser._id, matchedUser._id],
    })
    await conversation.save()

    res.status(200).json({ message: 'Match handled successfully' })
  } catch (error) {
    console.error('Error handling match:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { getCard, postSwipe, postMatch }
