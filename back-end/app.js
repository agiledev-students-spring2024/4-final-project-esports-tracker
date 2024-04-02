// import required modules
const express = require("express") // framework for building web applications
const cors = require("cors") // middleware for enabling Cross-Origin Resource Sharing (CORS)
const morgan = require("morgan") // middleware for logging HTTP requests in a readable format

const app = express() // instantiate an Express object

// import routes
const swipeRouter = require("./routes/swipeRouter")
const feedRouter = require("./routes/feedRouter")
const registerRouter = require("./routes/registerRouter")
const postRouter = require("./routes/postRouter")
const discoverRouter = require("./routes/discoverRouter")
const profileRouter = require("./routes/profileRouter")

// use middleware
app.use(morgan("dev")) // use morgan with dev style for logging HTTP requests
app.use(cors()) // allows cross-origin resource sharing
app.use(express.json())

// use routers
app.use("/feed", feedRouter)
app.use("/swipe", swipeRouter)
app.use("/auth", registerRouter)
app.use("/post", postRouter)
app.use("/discover", discoverRouter)
app.use("/profile", profileRouter)

module.exports = app
