const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  getProductsByCategory
} = require("../controller/productControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);
router.post("/addProduct", addProduct);
router.post("/deleteProduct", deleteProduct);


// getProductsByCategory?
module.exports = router;
