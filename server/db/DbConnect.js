const mongoose = require("mongoose");
require("dotenv").config();
function connectDB() {
  mongoose
    .connect(process.env.DBURI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err.message));
}

module.exports = connectDB;
