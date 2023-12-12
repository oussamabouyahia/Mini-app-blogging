const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model("User").findById(userId);
        return user !== null;
      },
      message: "User with the specified ID does not exist.",
    },
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", schema);
module.exports = Post;
