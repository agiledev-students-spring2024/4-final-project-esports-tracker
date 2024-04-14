// import required modules
require('dotenv').config(); //load the .env file
const express = require("express") // framework for building web applications
const cors = require("cors") // middleware for enabling Cross-Origin Resource Sharing (CORS)
const morgan = require("morgan") // middleware for logging HTTP requests in a readable format
const path = require('path'); // Add this line to import the path module


const app = express() // instantiate an Express object
require('./models/user')
require('./models/post')

const mongoose = require('mongoose'); //use mongoose

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
app.use('/Images', express.static(path.join(__dirname, 'Images'))); // configure to serve static files


// use routers
app.use("/feed", feedRouter)
app.use("/swipe", swipeRouter)
app.use("/auth", registerRouter)
app.use("/post", postRouter)
app.use("/discover", discoverRouter)
app.use("/profile", profileRouter)

//connect to the database
console.log(`${process.env.DB_CONNECTION_STRING}`)
mongoose
    .connect(`${process.env.DB_CONNECTION_STRING}`)
    .then(data => console.log(`Connected to MongoDB`))
    .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

module.exports = app