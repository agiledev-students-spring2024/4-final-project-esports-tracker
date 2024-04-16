const express = require("express")
const  { postPost } = require("../controllers/postController")

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post("/postPost", upload.single('image'), postPost)
router.get('/allPosts',getAllPosts )
router.get('/userPosts', getUserPosts)
// router.get('/singlePost', getPostById)
// router.post('')


module.exports = router