const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3500;
const dbConnect = require("./db/DbConnect");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const socket = require("./socket");
socket.setIo(io);
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

io.on("connection", (socket) => {
  console.log(socket.id);
});
app.use("/user", require("./routes/useRoute"));
app.use("/post", require("./routes/postRoute"));

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  dbConnect();
});
