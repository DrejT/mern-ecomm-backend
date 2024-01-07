const express = require("express");
const {
  validateItemGetSchema,
  validateItemCreateSchema,
  validateItemEditSchema,
  validateItemGetAllSchema,
  uploadImage,
} = require("../middlewares/item.middleware");
const {
  getItem,
  getAllItem,
  createItem,
  editItem,
  deleteItem,
} = require("../controllers/item.controller");
const { authorizeAdminSession } = require("../utils/session");
const upload = require("../utils/multer");

const router = new express.Router();

router.use(authorizeAdminSession);
router.get("/:id", validateItemGetSchema, getItem);
router.get("/", validateItemGetAllSchema, getAllItem);

router.post(
  "/",
  upload.single("itemImage"),
  validateItemCreateSchema,
  uploadImage,
  createItem
);

router.patch("/:slug", validateItemEditSchema, editItem);

router.delete("/:slug", deleteItem);

module.exports = router;
