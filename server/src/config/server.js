const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Initializations:
const server = express();

// Middlewares:
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use("/", require("../routes/index.js"));

// Static files:
server.use(
  "/image",
  express.static(path.join(__dirname, "../assets/image_bank"))
);

module.exports = server;
