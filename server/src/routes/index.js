const { Router } = require("express");
const router = Router();

router.use("/products/category", require("./category.js"));

module.exports = router;
