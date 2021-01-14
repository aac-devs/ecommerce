const { Router } = require("express");
const router = Router();

router.use("/products/category", require("./category.js"));
router.use("/products", require("./product.js"));
router.use("/search", require("./search.js"));

module.exports = router;
