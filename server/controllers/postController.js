const Post = require("../db/postModel");
require("dotenv").config();

const createPost = async (req, res) => {
  const { userId } = req.params;
  const { title, content } = req.body;
  try {
    const newPost = new Post({ userId, title, content });
    await newPost.save();
    if (newPost)
      res.status(201).json({ message: "new post created successfully!" });
    else res.status(400).json({ message: "something went wrong" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ Error: error.message || `internal server problem` });
  }
};
const allPosts = async (req, res) => {
  try {
    const postsList = await Post.find();
    postsList.length > 0
      ? res.status(200).json({ postsList })
      : res.status(404).send("no posts found");
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server problem!" });
  }
};
const getPostsByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const myPosts = await Post.find({ userId: id });
    myPosts.length > 0
      ? res.status(200).json({ myPosts })
      : res.status(404).json("no posts found");
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server problem!" });
  }
};
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    updatedPost
      ? res.status(200).json({ message: "updated successfully", updatedPost })
      : res.status(400).send("something went wrong");
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server problem!" });
  }
};
const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const targetPost = await Post.findByIdAndDelete(postId);
    targetPost
      ? res.status(200).json({ message: "post deleted successfully" })
      : res.status(404).json({ error: "Post not found!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server problem!" });
  }
};
module.exports = {
  createPost,
  allPosts,
  getPostsByUser,
  updatePost,
  deletePost,
};