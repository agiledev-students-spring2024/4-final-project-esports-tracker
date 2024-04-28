import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { IoChevronBack, IoSend } from 'react-icons/io5'
import './Chat.css'
import io from 'socket.io-client'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [socket, setSocket] = useState(null)
  const [sender, setSender] = useState(null)
  const [receiver, setReceiver] = useState(null)
  const { chatId } = useParams()

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))['data']
        if (userData) {
          const { data } = await axios.get(
            `http://localhost:3001/message/chat/${chatId}/${userData.user}`
          )
          setMessages(data.messages)
          setSender(data.sender)
          setReceiver(data.receiver)
        }
      } catch (error) {
        console.error('Error fetching conversations:', error)
      }
    }
    fetchChat()

    // set up socket connection
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    // add an event listener for incoming messages
    newSocket.on('chat message', (data) => {
      if (data.chatId == chatId) {
        setMessages((prevMessages) => [data.message, ...prevMessages])
      }
    })

    // join the room associated with the current chat
    newSocket.emit('join room', chatId)

    // cleanup function for when the component unmounts
    return () => {
      newSocket.disconnect()
    }
  }, [setSocket])

  const sendMessage = async (e) => {
    e.preventDefault()

    if (!messageInput.trim()) return

    try {
      if (socket) {
        // emit message to other user
        socket.emit('chat message', {
          chatId: chatId,
          sender: sender._id,
          message: messageInput,
        })

        // save the message to the database
        await axios.post('http://localhost:3001/message/chat/create', {
          conversationId: chatId,
          senderId: sender._id,
          receiverId: receiver._id,
          messageContent: messageInput,
        })

        // clear the message input
        setMessageInput('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (!receiver) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="chatHeader">
        <Link to="/message">
          <IoChevronBack size={32} />
        </Link>
        <div className="petOwnersName">{receiver.username}</div>
        <Link to="/profile">
          <img src={receiver.pfp} alt="avatar" />
        </Link>
      </div>
      <div className="chatContent">
        <div className="chatMessages">
          {messages.map((msg, i) => (
            <div
              className={
                msg.sender === sender._id ? 'chatSent' : 'chatReceived'
              }
              key={i}
            >
              <div className="chatBubble">
                <div className="chatMessage">{msg.message}</div>
              </div>
            </div>
          ))}
          <div className='chatWelcome'>
            It's a match! You and {receiver.username} are ready to plan a
            playdate for your furry friends.
          </div>
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
