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
        expiresIn: "45s", // I choose 45s only for test and it is not true for real case
      });
      res
        .status(200)
        .json({ message: `${user.name} loggedin successfully`, token });
    } else {
      res.status(401).json({ error: "unauthorized access , wrong password" });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server problem" });
  }
};
module.exports = { register, login };
