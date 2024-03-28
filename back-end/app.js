// import required modules
const express = require("express") // framework for building web applications
const cors = require("cors") // middleware for enabling Cross-Origin Resource Sharing (CORS)
const morgan = require("morgan") // middleware for logging HTTP requests in a readable format

const app = express() // instantiate an Express object

// import routes
const feedRoute = require("./routes/feedRoute")
const swipeRoute = require("./routes/swipeRoute")
const sampleRouter = require("./routes/sampleRouter")
const feedRouter = require("./routes/feedRouter")

// use middleware
app.use(morgan("dev")) // use morgan with dev style for logging HTTP requests 
app.use(cors()) // allows cross-origin resource sharing

// use routers
app.use("/", sampleRouter)
app.use("/", feedRouter)

app.use("/swipe", require("./routes/swipeRoute"))

module.exports = app
