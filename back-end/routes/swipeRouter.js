const express = require("express")
const  { getCard, postSwipe } = require("../controllers/swipeController")

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get("/card", getCard)
router.post("/postSwipe", postSwipe)

module.exports = router