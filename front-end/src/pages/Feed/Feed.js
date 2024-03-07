import "./Feed.css"
import Post from "./Post"
import TabSwitcher from "./TabSwitcher"

const Feed = () => {
  // sample posts 
  const posts = [
    {
      username: "pawsandwhiskers",
      image:
        "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Snowball on a bed-time journey.",
    },
    {
      username: "petpalpassion",
      image:
        "https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Sunny smiles with Luna.",
    },
    {
      username: "snugglepaws123",
      image:
        "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Napping in a cozy spot.",
    },
  ]

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
