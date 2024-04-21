const express = require("express")
const router = express.Router()
const Message = require("../models/message")
const Conversation = require("../models/conversation")
const axios = require("axios")

router.get("/chats", (req, res) => {
  axios
    .get("https://picsum.photos/v2/list?page=4&limit=10")
    .then((response) => {
      const data = response.data
      res.json(data)
    })
    .catch((error) => {
      console.error("Error fetching chats:", error)
      res.status(500).send("An error occurred while fetching chats.")
    })
})

router.get("/matches", async (req, res) => {
  axios
    .get("https://picsum.photos/v2/list?page=2&limit=10")
    .then((response) => {
      const data = response.data
      res.json(data)
    })
    .catch((error) => {
      console.error("Error fetching matches:", error)
      res.status(500).send("An error occurred while fetching matches.")
    })
})

module.exports = router
