import { Link } from 'react-router-dom'
import './ChatPanel.css'

const ChatPanel = ({ chat }) => {
  return (
    <>
      <Link to={`/chat/${chat.id}`} className="chatBox">
        <img className="avatarImage" src={chat.participant.pfp} alt="avatar" />
        <div className="messageItemContent">
          <div className="messageRecipient">{chat.participant.username}</div>
          <div className="messageMostRecent">{chat.mostRecent}</div>
        </div>
      </Link>
    </>
  )
}

export default ChatPanel
