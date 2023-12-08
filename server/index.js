const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3500;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("test of get request work");
});

app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT}`);
});
