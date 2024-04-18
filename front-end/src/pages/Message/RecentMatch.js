import { Link } from "react-router-dom"
import "./RecentMatch.css"

const RecentMatch = ({ profileID, url, author }) => {
  return (
    <>
      <Link to={profileID} className="matchItem">
        <img className="avatarImage" src={url} alt="avatar" />
        <div className="matchItemName">{author}</div>
      </Link>
    </>
  )
}

export default RecentMatch
