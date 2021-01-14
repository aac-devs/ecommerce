const server = require("express").Router();
const { Product, Image } = require("../config/db.js");

// Ruta: http://localhost:5001/search?query={valor} - GET
server.get("/", async (req, res) => {
  const value = req.query.query.toLowerCase();
  try {
    const products = await Product.findAll({
      include: [Image],
    });
    const filtedProds = products.filter((prod) => {
      const filName = prod.name
        .split(" ")
        .map((item) => item.toLowerCase())
        .filter((item) => item.startsWith(value));

      const filDesc = prod.description
        .split(" ")
        .map((item) => item.toLowerCase())
        .filter((item) => item.startsWith(value));

      if (filName.length > 0 || filDesc.length > 0) {
        return prod.id;
      }
    });

    if (filtedProds.length === 0) {
      res.json({
        message: "No matches were found with the search item entered.",
        data: [],
      });
    } else {
      res.json({
        message: `${filtedProds.length} products found.`,
        data: filtedProds,
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = server;
