const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('user')
const Conversation = require('../models/conversation')
const Message = require('../models/message')

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

router.get('/chat/:chatId/:username', async (req, res) => {
  const { chatId, username } = req.params
  try {
    // find the user based on their username
    const user = await User.findOne({ username }).select('_id')
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    // fetch and return all messages in the conversation
    const messages = await Message.find({ conversation: chatId }).sort({ createdAt: -1 })

    // find the other user
    const otherUserId =
      messages[0].sender.toString() === user._id.toString()
        ? messages[0].receiver
        : messages[0].sender

    const otherUser = await User.findById(otherUserId).select('_id username pfp')

    res.json({ sender: user, receiver: otherUser, messages: messages })
  } catch (error) {
    console.error('Error fetching chat:', error)
    res.status(500).send('An error occurred while fetching chat.')
  }
})

router.post('/chat/create', async (req, res) => {
  try {
    const { conversationId, senderId, receiverId, messageContent } = req.body

    // create a new message
    const newMessage = new Message({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      message: messageContent,
    })

    // save the new message to the database
    await newMessage.save()

    res.status(201).json({ message: 'Message created successfully' })
  } catch (error) {
    console.error('Error creating message:', error)
    res.status(500).json({ error: 'An error occurred while creating message.' })
  }
})

module.exports = router
