const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const userValidMiddleware = require("../Middlewares/userValidation");

router.post(
  "/register",
  userValidMiddleware.validateUserRegister,
  UserController.register
);
router.post("/login", UserController.login);

module.exports = router;
