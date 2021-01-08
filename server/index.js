// const express = require("express");
const server = require("./src/config/server.js");
const { conn } = require("./src/config/db.js");
const PORT = process.env.PORT || 5000;

// starting server:
(async function () {
  try {
    await conn.sync({ force: true });
    await server.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  } catch (error) {
    console.log(
      "There was an error with server or database connection:",
      error.message
    );
  }
})();
