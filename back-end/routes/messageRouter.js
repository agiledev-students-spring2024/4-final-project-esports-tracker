const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('user')
const Conversation = require('../models/conversation')

router.get('/conversations/:username', async (req, res) => {
  const { username } = req.params
  try {
    // find the user based on their username
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }
    // find all conversations where the user is a participant
    const conversations = await Conversation.find({ participants: user._id })
      .select('_id participants messages')
      .lean()
    // extract participant object IDs from conversations
    const participantIds = conversations.map((conversation) =>
      conversation.participants.find(
        (id) => id.toString() !== user._id.toString()
      )
    )
    // find participant details
    const participants = await User.find({ _id: { $in: participantIds } })
      .select('_id username pfp')
      .lean()
    // map recipient information to conversations
    const results = conversations.map((conversation) => {
      const recipientId = conversation.participants.find(
        (id) => id.toString() !== user._id.toString()
      )
      const recipient = participants.find(
        (participant) => participant._id.toString() === recipientId.toString()
      )
      return {
        id: conversation._id,
        recipient,
        messages: conversation.messages,
      }
    })
    res.json({ results })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    res.status(500).send('An error occurred while fetching conversations.')
  }
})

module.exports = router
