import { useState } from "react";
import { Textarea, Input, Button } from "@chakra-ui/react";
import { UpdateType } from "../type";
import axios from "axios";
export const CreatePost = () => {
  const [post, setPost] = useState<UpdateType>({ title: "", content: "" });

  const createPost = () => {
    const userId = localStorage.getItem("userId");
    axios
      .post(`http://localhost:5000/post/${userId}`, post, {
        headers: {
          Authorization: `Beare ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
        setPost({ title: "", content: "" });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div>
      <h1>CreatePost</h1>
      <div style={{ margin: "5%" }}>
        <label>Title:</label>
        <Input
          placeholder="Basic usage"
          name="title"
          type="text"
          title="title length should be between 03 and 10 characters"
          onChange={(e) =>
            setPost((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        {((post.title.length > 0 && post.title.length < 3) ||
          post.title.length > 30) && (
          <p color="red">title length should be between 03 and 10 characters</p>
        )}
        <label style={{ marginTop: "10%" }}>Post Content:</label>
        <Textarea
          placeholder="Here is a post content"
          onChange={(e) =>
            setPost((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
        />
        {((post.content.length > 0 && post.content.length < 10) ||
          post.content.length > 100) && (
          <p color="red">
            content length should be between 10 and 100 characters
          </p>
        )}
      </div>
      <Button
        background="green"
        isDisabled={
          post.content.length < 10 ||
          post.title.length < 3 ||
          post.title.length > 30
        }
        onClick={createPost}
      >
        Submit
      </Button>
    </div>
  );
};
