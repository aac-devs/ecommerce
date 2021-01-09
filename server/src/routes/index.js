const { Router } = require("express");
const router = Router();

router.use("/products/category", require("./category.js"));
router.use("/products", require("./product.js"));

module.exports = router;
