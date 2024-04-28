import { Link } from 'react-router-dom'
import './RecentMatch.css'

const RecentMatch = ({ match }) => {
  return (
    <>
      <Link to={`/chat/${match.id}`} className="matchItem">
        <img className="avatarImage" src={match.participant.pfp} alt="avatar" />
        <div className="matchItemName">{match.participant.username}</div>
      </Link>
    </>
  )
}

export default RecentMatch
