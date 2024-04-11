import { useState, useEffect } from "react"
import "./Feed.css"
import Post from "./Post"
import TabSwitcher from "./TabSwitcher"
import useAuth from '../../hooks/useAuth';



const Feed = () => {
  const [posts, setPosts] = useState([])
  const {user} = useAuth();  // 


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/feed",
        {headers:{
          "Authorization": `Bearer ${user.data.token}`,
        }})
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        setPosts(data)
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
          {posts.map((post, i) => (
            <Post username={post.username} image={post.image} caption={post.caption} key={i} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed
