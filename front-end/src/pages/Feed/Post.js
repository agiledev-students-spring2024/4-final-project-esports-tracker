import { useState, useEffect } from "react"
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
import { IoChevronBack, IoChevronDown, IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Post = ({ username: feedUsername, image: feedImage, caption: feedCaption, likeCount: feedLikes = 0 }) => {
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const { postId } = useParams();
  

  function handleLike() {
    setLiked(!liked) // toggle the liked state
    // TODO: send post requests
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/post/singlePost?postId=${postId}`, {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const postData = await response.json();
        setPost(postData.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (user && postId) {
      fetchPost();
    }
  }, [postId, user]);

  
  // TODO: clicking on a username redirects to that user's profile
  //ADD DATE CREATED AND LIKE COUNT THIS IS ALREADY IN THE DATABASE SCHEMA
  if (feedUsername && feedImage && feedCaption) {
  return (
    <>

      <div className="post">
        <div className="post-header">
          <IoPeopleCircleOutline className="post-icon" />
          <p>{feedUsername}</p>
        </div>
        <img className="post-image" src={feedImage} alt="" />
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
          <p>{feedLikes} Likes</p>
          <p>{feedCaption}</p>

          
        </div>
        
      </div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="postFooter"></div>
    </>
  )
}
else if (post) {
  // Rendering as a single page
  return (
    <>
        <div className='postBackButton'>
          <Link to='/feed'>
          <IoChevronBack size={30} color={"#0077B6"}/>
          </Link>
        </div>
      <div className="post">
        <div className="post-header">
          <IoPeopleCircleOutline className="post-icon" />
          <p>{post.postedBy.username}</p>
        </div>
        <img className="post-image" src={post.image} alt="" />
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
          <p>{post.likeCount} Likes </p>
          <p>{post.caption}</p>
        </div>
      </div>
      <div className="postFooter"></div>
    </>
  );
} else {
  // Loading state
  return <div>Loading...</div>;
}
}



export default Post
