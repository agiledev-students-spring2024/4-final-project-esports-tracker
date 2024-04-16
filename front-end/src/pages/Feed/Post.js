import { useState } from "react"
import {useParams} from 'react-router-dom'
import "./Post.css"
import {
  IoPeopleCircleOutline,
  IoHeartOutline,
  IoChatboxOutline,
  IoShareOutline,
  IoHeartSharp,
} from "react-icons/io5"
import useAuth from '../../hooks/useAuth';

const Post = (props) => {
  const [liked, setLiked] = useState(false)
  const {user} = useAuth();  // 
  const { postId } = useParams(); // Use useParams to get the postId from the URL

  function handleLike() {
    setLiked(!liked) // toggle the liked state
    // TODO: send post requests
  }

  
  // TODO: clicking on a username redirects to that user's profile
  //ADD DATE CREATED AND LIKE COUNT THIS IS ALREADY IN THE DATABASE SCHEMA
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
              {liked ? (
                <IoHeartSharp className="post-icon liked" onClick={handleLike} />
              ) : (
                <IoHeartOutline className="post-icon" onClick={handleLike} />
              )}
              <IoChatboxOutline className="post-icon" />
            </div>
            <IoShareOutline className="post-icon" />
          </div>
          <p>{props.caption}</p>
        </div>
        
      </div>
      <div className="postFooter"></div>
    </>
  )
}

export default Post
