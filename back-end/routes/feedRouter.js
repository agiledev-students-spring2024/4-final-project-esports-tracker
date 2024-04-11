const express = require("express")
const router = express.Router()
const posts = require("../data/posts.json")
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


router.get("/", (req, res) => {
  res.json(posts)
})

module.exports = router
