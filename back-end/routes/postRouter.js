const express = require("express")
const  { postPost, getAllPosts, getUserPosts, postLike } = require("../controllers/postController")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, './Images')
    },
    filename: (req, file, callback) => {
      callback(null, req.user._id + '_' + Date.now())
    }
  })
  
  const upload = multer({
    storage: storage
  })
  

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post("/postPost", upload.single('image'), postPost)
router.get('/allPosts',getAllPosts )
router.get('/userPosts', getUserPosts)
// router.post('')

module.exports = router