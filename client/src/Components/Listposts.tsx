import { useEffect, useState } from "react";
import axios from "axios";
import { PostUser } from "../type";
import Post from "./Post";
const Listposts = () => {
  const [posts, setPosts] = useState<PostUser[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/post")
      .then((res) => setPosts(res.data.list))
      .catch((err) => alert(err.message));
    axios;
  }, []);
  return (
    <div>
      <h1>List of posts</h1>
      {posts.map((e) => (
        <Post
          title={e.title}
          content={e.content}
          userName={e.userName}
          key={e._id}
        />
      ))}
    </div>
  );
};

export default Listposts;
