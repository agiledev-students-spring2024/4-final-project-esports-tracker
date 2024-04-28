const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
    mostRecent: {
      type: ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
)

const ConversationModel = mongoose.model('Conversation', conversationSchema)

module.exports = ConversationModel
