import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { IoChevronBack, IoPersonCircleOutline, IoSend } from "react-icons/io5"
import "./Chat.css"
import io from "socket.io-client"

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io("http://localhost:3001")

    // add an event listener for incoming messages
    newSocket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg])
    })

    setSocket(newSocket)

    // cleanup function for when the component unmounts
    return () => {
      newSocket.disconnect()
    }
  }, [setSocket])

  const sendMessage = (e) => {
    e.preventDefault()

    if (!socket || !messageInput.trim()) return

    socket.emit("chat message", messageInput)
    setMessageInput("")
  }

  return (
    <>
      <div className="chatHeader">
        <Link to="/message">
          <IoChevronBack size={32} />
        </Link>
        <div className="petOwnersName">Pet Owner's Name</div>
        <Link to="/profile">
          <IoPersonCircleOutline size={40} />
        </Link>
      </div>

      <div className="chatContent">
        <div className="chatMessages">
          {messages.map((msg, i) => (
            <div className="chatSent" key={i}>
              <div className="chatBubble">
                <div className="chatMessage">{msg}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chatOptions">
          <input
            className="chatInput"
            type="text"
            placeholder="Type a message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button className="chatSend" onClick={sendMessage}>
            <IoSend size={28} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Chat
