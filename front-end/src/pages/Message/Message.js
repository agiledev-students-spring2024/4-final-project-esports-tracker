import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Message.css'
import RecentMatch from './RecentMatch'
import ChatPanel from './ChatPanel'
const BASE_URL = process.env.REACT_APP_API_BASE_URL

const Message = () => {
  const [search, setSearch] = React.useState('')
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))['data']
        if (userData) {
          const { data } = await axios.get(
            `${BASE_URL}/message/conversations/${userData.user}`
          )
          setConversations(data.results)
        }
      } catch (error) {
        console.error('Error fetching conversations:', error)
      }
    }
    fetchConversations()
  }, [])

  const matches = conversations.filter(
    (conversation) => conversation.mostRecent == null
  )

  const chats = conversations.filter(
    (conversation) => conversation.mostRecent != null
  )

  const handleSubmit = (event) => {
    setSearch(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Handle pressing Enter key here
      handleSubmit(event)
    }
  }

  return (
    <>
      <div className="messageHeader">Messages</div>

      {/* change this */}
      <div className="messageSearch">
        <input
          type="text"
          placeholder="search"
          name="search"
          value={search}
          onChange={handleSubmit}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="messageSection">Recent Matches</div>
      <div className="recentMatches">
        {matches.map((match, i) => (
          <RecentMatch match={match} key={i} />
        ))}
      </div>

      <div className="messageSection">Chats</div>
      <div className="chats">
        {chats.map((chat, i) => (
          <ChatPanel chat={chat} key={i} />
        ))}
      </div>
    </>
  )
}

export default Message
