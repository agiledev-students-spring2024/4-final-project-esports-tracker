import { useState, useEffect } from "react"
import "./Feed.css"
import Post from "./Post"
import TabSwitcher from "./TabSwitcher"

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/feed")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchData()
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
