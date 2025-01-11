const path = require("path");
const {
  getProducts,
  getIndex,
  getCart,

  getOrders,
  getProduct,
  postOrder,
  postCartDeleteProduct,
  postCart,
} = require("../controllers/shop");
const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/products/:productId", getProduct);

router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", postCartDeleteProduct);
router.get("/orders", getOrders);
router.post("/create-order", postOrder);

module.exports = router;
