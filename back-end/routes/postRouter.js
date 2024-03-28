const express = require("express")
const  { postPost } = require("../controllers/postController")

const router = express.Router()

router.get("/", postPost)

module.exports = router