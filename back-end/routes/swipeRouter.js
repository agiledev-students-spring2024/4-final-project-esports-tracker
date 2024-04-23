const express = require("express")
const  { getCard, postSwipe, postMatch } = require("../controllers/swipeController")

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get("/card", getCard)
router.post('/handleMatch', postMatch)
router.post("/postSwipe", postSwipe)

module.exports = router