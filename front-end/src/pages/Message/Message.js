import React,  {useState} from 'react'
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
  const images= ['https://picsum.photos/id/237/200/300']
  const profileID = '/profile'
  const items = ['John', 'bob', ,'ricky', 'ricky ticky boby wobin',];
  return (
    <>
    <div className='header'>
      <h1>Messages</h1>
    </div>

    {/* change this */}
    <div className='Search'>
      <input type='text' placeholder="search" name="search" 
        value={search}
        onChange={handleSubmit}
        onKeyDown={handleKeyPress}
        />
    </div>

    <h4>Recent Matches</h4>
      <hr/>
    <div className = 'recentMatches'>
      {items.map((name, index) => (
        <Link to={profileID} className='matchItem'>
            <img src={images} alt='avatar' />
            <div className='matchItemName'>
              <span>{name}</span>
            </div>
        </Link>
      ))}
    </div>

    <h4>Chats</h4>
    <hr/>
    <div className='Chats'>

    {items.map((name, index) => (
      <Link to={profileID} className='chatBox'>
        <img src={images} alt='avatar' />
        <div className='messageItemContent'>
          <div className='MessageItem__content__name'>
            <span style={{ fontWeight: 'bold' }}>{name}</span>
          </div>
          <div className='MessageItem__message'>
            <span>Hey, how are you?</span>
          </div>
        </div>
      </Link>
    ))}
     

    </div>
    </>
  )
}

export default Message