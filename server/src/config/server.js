const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Initializations:
const server = express();

// Middlewares:
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Static files:
server.use(express.static(path.join(__dirname, "../assets/image_bank")));

module.exports = server;