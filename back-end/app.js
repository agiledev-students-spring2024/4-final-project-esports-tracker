// import required modules
const express = require("express") // framework for building web applications
const cors = require("cors") // middleware for enabling Cross-Origin Resource Sharing (CORS)
const morgan = require("morgan") // middleware for logging HTTP requests in a readable format

const app = express() // instantiate an Express object

// import routes
const feedRoute = require("./routes/feedRoute")
const swipeRoute = require("./routes/swipeRoute")

// use middleware
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allows cross-origin resource sharing

// use routers
app.use("/", feedRoute)

app.use("/swipe", require("./routes/swipeRoute"))

module.exports = app
