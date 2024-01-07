const express = require("express");
const {
  validateGetUserByUsername,
} = require("./../middlewares/user.middleware");
const { getUserByUsername } = require("./../controllers/user.controller");
const {
  validateOrderGetSchema,
  validateOrderCreateSchema,
} = require("../middlewares/order.middleware");
const { orderGet, orderCreate } = require("../controllers/order.controller");
const {
  getAllUserStore,
  getUserStore,
} = require("../controllers/store.controller");
const { getUserReview } = require("./../controllers/review.controller");
const { getUserItem } = require("../controllers/item.controller");

const router = new express.Router();

// public store route to get all the available stores
router.get("/store", getAllUserStore);
router.get("/store/:slug", getUserStore);

// public item route to get a specific item
router.get("/item/:slug", getUserItem);

// public route to get all the reviews of an item
router.get("/review/:itemId", getUserReview);
// user specific route to get all the orders of the currently logged in user
router.get("/order", validateOrderGetSchema, orderGet);
// allows to create an order
router.post("/order", validateOrderCreateSchema, orderCreate);

// meant to send the info of a user given their username
router.get("/:username", validateGetUserByUsername, getUserByUsername);

module.exports = router;
