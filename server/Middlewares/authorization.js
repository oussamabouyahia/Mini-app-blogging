const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorization = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "not authorized" }); //token invalid
    req.id = decoded.id;
    next();
  });
};
module.exports = authorization;
