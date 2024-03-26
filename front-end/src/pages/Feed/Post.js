import "./Post.css"
import { IoPeopleCircleOutline, IoHeartOutline, IoChatboxOutline, IoShareOutline } from "react-icons/io5"

const Post = (props) => {
  // TODO: clicking on a username redirects to that user's profile
  return (
    <>
      <div className="post">
        <div className="post-header">
          <IoPeopleCircleOutline className="post-icon" />
          <p>{props.username}</p>
        </div>
        <img className="post-image" src={props.image} alt="" />
        <div className="post-details">
          <div className="post-icons">
            <div>
              <IoHeartOutline className="post-icon" />
              <IoChatboxOutline className="post-icon" />
            </div>
            <IoShareOutline className="post-icon" />
          </div>
          <p>{props.caption}</p>
        </div>
      </div>
    </>
  )
}

export default Post
