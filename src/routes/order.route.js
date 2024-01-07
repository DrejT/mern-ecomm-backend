const express = require("express");
const { authorizeAdminSession } = require("../utils/session");
const {
  getStoreOrders,
  getAllOrders,
} = require("../controllers/order.controller");
const router = new express.Router();

router.use(authorizeAdminSession);

router.get("/:id", getStoreOrders);
router.get("/", getAllOrders);

module.exports = router;
