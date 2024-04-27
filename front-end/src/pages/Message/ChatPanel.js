import { Link } from 'react-router-dom'
import './ChatPanel.css'

const ChatPanel = ({ chat }) => {
  return (
    <>
      <Link to={`/chat/${chat.id}`} className="chatBox">
        <img className="avatarImage" src={chat.recipient.pfp} alt="avatar" />
        <div className="messageItemContent">
          <div className="messageRecipient">{chat.recipient.username}</div>
          <div className="messageMostRecent">this is a chat. Hello</div>
        </div>
      </Link>
    </>
  )
}

export default ChatPanel
