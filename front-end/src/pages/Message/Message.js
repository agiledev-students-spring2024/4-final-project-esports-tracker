import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Message.css"
import RecentMatch from "./RecentMatch"
import ChatPanel from "./ChatPanel"

const Message = () => {
  const [search, setSearch] = React.useState("")

  
  const handleSubmit = (event) => {
    setSearch(event.target.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Handle pressing Enter key here
      handleSubmit(event)
    }
  }

  // placeholders
  const [matches, setMatches] = useState([])
  const [chats, setChats] = useState([])
  const [error, setError] = useState("")

  function fetchMatches() {
    axios
      .get("http://localhost:3001/message/matches")
      .then((response) => {
        setMatches(response.data)
        console.log("matches", response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMsg = JSON.stringify(error, null, 2)
        setError(errorMsg)
      })
  }

  function fetchChats() {
    axios
      .get("http://localhost:3001/message/chats")
      .then((response) => {
        setChats(response.data)
        console.log("chats", response.data)
      })
      .catch((error) => {
        console.log(error)
        const errorMsg = JSON.stringify(error, null, 2)
        setError(errorMsg)
      })
  }

  useEffect(() => {
    fetchMatches()
    fetchChats()
  }, [])

  const profileID = "/profile"

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
          <RecentMatch id={profileID} author={match.author} url={match.download_url} key={i} />
        ))}
      </div>

      <div className="messageSection">Chats</div>
      <div className="chats">
        {chats.map((chat, i) => (
          <ChatPanel id={chat.id} author={chat.author} url={chat.download_url} key={i} />
        ))}
      </div>
    </>
  )
}

export default Message
