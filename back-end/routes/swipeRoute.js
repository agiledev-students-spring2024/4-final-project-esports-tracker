const express = require("express")
const  { getCard, postSwipe } = require("../controllers/swipeController")

const router = express.Router()

router.get("/", getCard)

module.exports = router