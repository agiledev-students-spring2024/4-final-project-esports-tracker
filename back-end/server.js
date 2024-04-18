#!/usr/bin/env node

const app = require("./app") // load up the web server
const http = require("http")
const socketIo = require("socket.io")

const port = process.env.PORT || 3001 // the port to listen to for incoming requests

const server = http.createServer(app)

// integrate socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // TODO: update when deployed
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("chat message", (msg) => {
    console.log("message: " + msg)
    io.emit("chat message", msg)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

// call express's listen function to start listening to the port
const listener = server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}
