const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const messageSchema = new Schema({
  conversation: {
    type: ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const MessageModel = mongoose.model("Message", messageSchema)

module.exports = MessageModel
