import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

import "./Feed.css"
import Post from "./Post"
import TabSwitcher from "./TabSwitcher"
import useAuth from '../../hooks/useAuth';
import welcomeImage from './welcome.png';




const Feed = () => {
  const [posts, setPosts] = useState([])
  const {user} = useAuth();  // 


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/post/allPosts",
        {headers:{
          "Authorization": `Bearer ${user.data.token}`,
        }})
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        setPosts(data.allPosts)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    if(user){
      fetchData()
    }
  }, [])

  return (
    <>
    <div className="top_header">
      <div className='header'>
      <img src={welcomeImage} alt="Welcome" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', margin: 'auto 0', position: 'absolute', position: 'absolute',  top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
    </div>
      <div className="feed">
        <TabSwitcher
          firstTab={{ name: "Feed", path: "/feed" }}
          secondTab={{ name: "Discover", path: "/discover" }}
        />
        <div className="posts"> 
          {posts.slice().reverse().map((post, i) => (
            <Link to={`/post/${post._id}`} key={post._id}>
                <Post username={post.postedBy.username} image={post.image} caption={post.caption} key={i} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed
