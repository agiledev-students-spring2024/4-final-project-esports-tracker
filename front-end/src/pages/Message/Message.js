import React,  {useState, useEffect} from 'react'
import axios from 'axios'
import './Message.css'
import { Link } from 'react-router-dom';


const Message = () => {
  const [search, setSearch] = React.useState('')
  const handleSubmit = (event) => {
    setSearch(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Handle pressing Enter key here
      handleSubmit(event);
    }
  };

  // placeholders
  const [matches, setMatches] = useState([])
  const [chats, setChats] = useState([])
  const [error, setError] = useState('')

  const fetchMatches = () => {
      axios.get(`https://picsum.photos/v2/list`)
      .then(res => {
        setMatches(res.data)
      })
      .catch(err => {
        console.log(err)
        const errMsg = JSON.stringify(err, null, 2) 
        setError(errMsg)
      })
      
  }
  const fetchChats = () => {
      axios.get(`https://picsum.photos/v2/list`)
      .then(res => {
        setChats(res.data)
      })
      .catch(err => {
        console.log(err)
        const errMsg = JSON.stringify(err, null, 2) 
        setError(errMsg)
      })
  }

  useEffect(() => {
    fetchMatches()
    fetchChats()
    const intervalHandle = setInterval(() => {
      fetchMatches()
      fetchChats()
    }, 5000)
    return e => {
      clearInterval(intervalHandle)
    }
    }, [])


  //placeholder for route
  const profileID = '/profile'
  const chatID = '/chat'





  return (
    <>
    <div className='header'>
      <h1>Messages</h1>
    </div>

    {/* change this */}
    <div className='search'>
      <input type='text' placeholder="search" name="search" 
        value={search}
        onChange={handleSubmit}
        onKeyDown={handleKeyPress}
        />
    </div>
    <h4>Recent Matches</h4>
      <hr/>
    <div className = 'recentMatches'>
      {matches.map(match => (
        <Link to={profileID} className='matchItem'>
            <img className='avatar-image' src={match.download_url} alt='avatar' />
            <div className='matchItemName'>
              <span>{match.author}</span>
            </div>
        </Link>
      ))}
    </div>

    <h4>Chats</h4>
    <hr/>
    <div className='chats'>

    {chats.map(chat => (
      <Link to={chatID} className='chatBox'>
        <img className='avatar-image' src={chat.download_url} alt='avatar' />
        <div className='messageItemContent'>
          <div className='MessageItem_content_name'>
            <span style={{ fontWeight: 'bold' }}>{chat.author}</span>
          </div>
          <div className='messageItemMessage'>
            <span>this is a chat. Hello {chat.url}</span>
          </div>
        </div>
      </Link>
    ))}
     

    </div>
    </>
  )
}

export default Message