import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostType } from "../type";
import Post from "./Post";
const Listposts = () => {
  const [posts, setPosts] = useState<PostType[]>([]); // posts from the server
  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [updateContent, setUpdateContent] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      axios
        .get("http://localhost:5000/post", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => setPosts(res.data.list))
        .catch((err) => alert(err.message));
    } else {
      alert("unauthorized , user not signed in");
      navigate("/login");
    }
  }, [navigate]);
  const deletePost = (postId: number | undefined) => {
    axios
      .delete(`http://localhost:5000/post/${postId}`)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };
  const editPost = (postId: number | undefined) => {
    axios
      .put(`http://localhost:5000/post/${postId}`, {
        title: updateTitle,
        content: updateContent,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <h1>List of posts</h1>
      {posts ? (
        posts.map((e) => (
          <Post
            title={e.title}
            content={e.content}
            userName={e.userName}
            key={e._id}
            userId={e.userId}
            deletePost={() => deletePost(e._id)}
            editPost={() => editPost(e._id)}
            setUpdateTitle={setUpdateTitle}
            setUpdateContent={setUpdateContent}
          />
        ))
      ) : (
        <h1>loading data ...</h1>
      )}
    </div>
  );
};

export default Listposts;
