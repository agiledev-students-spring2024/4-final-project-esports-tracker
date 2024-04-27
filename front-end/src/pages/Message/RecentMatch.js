import { Link } from 'react-router-dom'
import './RecentMatch.css'

const RecentMatch = ({ match }) => {
  return (
    <>
      <Link to={`/chat/${match.id}`} className="matchItem">
        <img className="avatarImage" src={match.recipient.pfp} alt="avatar" />
        <div className="matchItemName">{match.recipient.username}</div>
      </Link>
    </>
  )
}

export default RecentMatch
