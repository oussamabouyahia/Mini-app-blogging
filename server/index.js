const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3500;
const dbConnect = require("./db/DbConnect");
app.use(express.json());
app.use(cors());
//general middleware for errors handling
app.use((err, req, res, next) => {
  if (err)
    return res
      .status(err.status || 500)
      .json({ error: err.message || "internal server porblem" });
  else next();
});
app.use("/user", require("./routes/useRoute"));
app.use("/post", require("./routes/postRoute"));
app.listen(PORT, () => {
  console.log(`server is listenning on port ${PORT}`);
  dbConnect();
});
