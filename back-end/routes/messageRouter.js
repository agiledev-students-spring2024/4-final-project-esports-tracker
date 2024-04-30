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
      .select('_id participants mostRecent')
      .lean()

    // extract other participants' object ID from the conversations
    const participantIds = conversations.flatMap((conversation) =>
      conversation.participants.filter(
        (id) => id.toString() !== user._id.toString()
      )
    )

    // find participant details
    const participants = new Map()
    await Promise.all(
      participantIds.map(async (participantId) => {
        const participant = await User.findById(participantId)
          .select('_id username pfp')
          .lean()

        // quick fix for missing profile pictures
        if (participant.pfp !== 'https://picsum.photos/id/237/200/300') {
          participant.pfp = `https://urchin-app-n5bks.ondigitalocean.app/final-project-pet-tinder-back-en/${participant.pfp}`
        }

        participants.set(participantId.toString(), participant)
      })
    )

    // map participant details to conversations
    const results = await Promise.all(
      conversations.map(async (conversation) => {
        const participantId = conversation.participants.find(
          (id) => id.toString() !== user._id.toString()
        )
        const participant = participants.get(participantId.toString())

        // find the most recent message in the conversation
        let mostRecent = null
        if (conversation.mostRecent !== null) {
          mostRecent = await Message.findById(conversation.mostRecent)
            .select('message')
            .lean()
          mostRecent = mostRecent ? mostRecent.message : null
        }

        return {
          id: conversation._id,
          participant,
          mostRecent: mostRecent,
        }
      })
    )

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
    const messages = await Message.find({ conversation: chatId }).sort({
      createdAt: -1,
    }).select('sender receiver message')

    let receiverId = null

    if (messages[0]) {
      receiverId =
        messages[0].sender.toString() === user._id.toString()
          ? messages[0].receiver
          : messages[0].sender
    } else {
      // find the conversation based on the chatId
      const conversation = await Conversation.findById(chatId)
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found.' })
      }

      // find the recipient
      receiverId = conversation.participants.find(
        (participant) => participant.toString() !== user._id.toString()
      )
      if (!receiverId) {
        return res.status(404).json({ error: 'Recipient not found.' })
      }
    }
    const receiver = await User.findById(receiverId).select('_id username pfp')

    // quick fix for missing profile pictures
    if (receiver.pfp !== 'https://picsum.photos/id/237/200/300') {
      receiver.pfp = `https://urchin-app-n5bks.ondigitalocean.app/final-project-pet-tinder-back-en/${receiver.pfp}`
    }

    res.json({ sender: user, receiver: receiver, messages: messages })
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

    // update the conversation's most recent message
    await Conversation.findByIdAndUpdate(conversationId, {
      mostRecent: newMessage._id,
    })

    res.status(201).json({ message: 'Message created successfully' })
  } catch (error) {
    console.error('Error creating message:', error)
    res.status(500).json({ error: 'An error occurred while creating message.' })
  }
})

module.exports = router
