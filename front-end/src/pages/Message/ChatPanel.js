import { Link } from "react-router-dom"
import "./ChatPanel.css"

const ChatPanel = ({ chatID, url, author }) => {
  return (
    <>
      <Link to={`/chat/${chatID}`} className="chatBox">
        <img className="avatarImage" src={url} alt="avatar" />
        <div className="messageItemContent">
          <div className="MessageItem_content_name">
            <span style={{ fontWeight: "bold" }}>{author}</span>
          </div>
          <div className="messageItemMessage">
            <span>this is a chat. Hello {url}</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ChatPanel
