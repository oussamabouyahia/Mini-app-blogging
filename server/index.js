const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3500;
const dbConnect = require("./db/DbConnect");
app.use(express.json());
app.use(cors());
app.use("/user", require("./routes/useRoute"));

app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT}`);
  dbConnect();
});
