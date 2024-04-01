const express = require("express")
const  { postPost } = require("../controllers/postController")

const router = express.Router()

router.post("/", postPost)

module.exports = router