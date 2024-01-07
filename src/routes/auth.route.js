const express = require("express");
const { destroySession } = require("./../utils/session");
const {
  register,
  getUserById,
  login,
} = require("../controllers/auth.controller");
const {
  validateRegisterSchema,
  validateLoginSchema,
} = require("../middlewares/auth.middleware");

const router = new express.Router();

router.post("/register", validateRegisterSchema, register);

router.get("/:id", getUserById);

// router.use(createSession); starts a session except after registration

router.post("/login", validateLoginSchema, login);

router.delete("/logout", destroySession);

module.exports = router;
