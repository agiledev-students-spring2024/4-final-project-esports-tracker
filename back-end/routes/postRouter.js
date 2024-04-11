const express = require("express")
const  { postPost } = require("../controllers/postController")

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post("/", postPost)

module.exports = router