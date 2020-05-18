const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/router");

const server = express();

const sessionConfig = {
    cookie: {
      maxAge: 1000 * 60 * 60, // one hour in milliseconds
      secure: process.env.SECURE_COOKIE || false, // send the cookie only over https, true in production
      httpOnly: true, // true means client JS cannot access the cookie
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOW_COOKIES || true,
    name: "UserId",
    secret: process.env.COOKIE_SECRET || "keepitsecret, keepitsafe!",
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth/", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "Server is Running" });
});

module.exports = server;