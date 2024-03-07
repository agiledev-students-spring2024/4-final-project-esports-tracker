import "./Feed.css";
import Post from "./Post";

const Feed = () => {
  // TODO: generate user content using Mockaroo + Unsplash API
  const posts = [
    {
      username: "username",
      image:
        "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Caption. This is a post.",
    },
    {
      username: "username",
      image:
        "https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Caption. This is a post.",
    },
    {
      username: "username",
      image:
        "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Caption. This is a post.",
    },
  ];

  return (
    <>
      <div className="feed">
        <h1>Feed</h1>
        <div className="posts">
          {posts.map((post, i) => (
            <Post
              username={post.username}
              image={post.image}
              caption={post.caption}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
