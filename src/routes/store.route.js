const express = require("express");
const {
  getStore,
  getAllStore,
  createStore,
  editStore,
  deleteStore,
  getAllAdminStore,
} = require("../controllers/store.controller");
const {
  validateStoreCreateSchema,
  validateStoreGetSchema,
  validateStoreEditSchema,
} = require("../middlewares/store.middleware");
const { authorizeAdminSession } = require("../utils/session");

const router = new express.Router();

// router.use(authorizeUserSession);
router.use(authorizeAdminSession);

router.get("/:id", validateStoreGetSchema, getStore);
router.get("/", getAllAdminStore);

router.post("/", validateStoreCreateSchema, createStore);

router.patch("/:slug", validateStoreEditSchema, editStore);

router.delete("/:slug", deleteStore);

module.exports = router;
