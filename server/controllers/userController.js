const User = require("../db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "email already used for a registred user!" });
    }
    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 10),
      name,
    });
    await newUser.save();
    if (newUser) {
      res.status(201).json({ message: "User registred successfully!" });
    } else {
      res.status(400).json({ message: "something wrong!" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "email not found" });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ id: user._id }, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: "480s", // I choose 480s only for test which isn't the real case
      });
      res.status(200).json({
        message: `${user.name} loggedin successfully`,
        token,
        userId: user._id,
      });
    } else {
      res.status(401).json({ error: "unauthorized access , wrong password" });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server problem" });
  }
};
const users = async (req, res) => {
  try {
    const listOfUsers = await user.find();
    listOfUsers.length
      ? res.status(200).json({ listOfUsers })
      : res.status(404).json({ error: "no users found!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server issue" });
  }
};
module.exports = { register, login };
