const express = require("express");
const router = express.Router();
const { getOrders, addOrder, getOrderByIds } = require("../controller/orderController");

router.get("/", getOrders);
router.post("/addOrder", addOrder);
router.post('/getOrderByIds', getOrderByIds)

module.exports = router;
