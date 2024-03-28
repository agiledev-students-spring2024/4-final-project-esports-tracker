// example using axios
const express = require("express")
const axios = require("axios")
const router = express.Router()

router.get("/sample", async (req, res) => {
  try {
    const response = await axios.get("https://picsum.photos/v2/list?page=3&limit=10")
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching photos:", error)
    res.status(500).send("An error occurred while fetching photos.")
  }
})

module.exports = router
