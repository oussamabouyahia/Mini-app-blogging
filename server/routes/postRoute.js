const express = require("express");
const router = express.Router();
const validate = require("../Middlewares/postValidation"); //middleware for validatring inputs
const postController = require("../controllers/postController");
const authorization = require("../Middlewares/authorization"); // authorization middleware

router.get("/", postController.allPosts);
router.post(
  "/:userId",
  authorization,
  validate.validatePost,
  postController.createPost
);
router.get("/:id", authorization, postController.getPostsByUser);
router
  .route("/:postId", authorization)
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
