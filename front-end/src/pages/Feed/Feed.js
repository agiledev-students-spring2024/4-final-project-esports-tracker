import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

import "./Feed.css"
import Post from "./Post"
import TabSwitcher from "./TabSwitcher"
import useAuth from '../../hooks/useAuth';
const BASE_URL = process.env.REACT_APP_API_BASE_URL



const Feed = () => {
  const [posts, setPosts] = useState([])
  const {user} = useAuth();  // 


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/post/allPosts`,
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
