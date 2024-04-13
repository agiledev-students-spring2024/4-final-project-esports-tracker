const express = require("express")
const  { postPost, getAllPosts, getUserPosts } = require("../controllers/postController")

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post("/createPost", postPost)
router.get('/allPosts',getAllPosts )
router.get('/userPosts', getUserPosts)

module.exports = router