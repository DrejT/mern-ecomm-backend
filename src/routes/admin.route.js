const express = require("express");
const {
  validateAdminRegisterSchema,
  validateAdminLoginSchema,
} = require("../middlewares/admin.middleware");
const { register, login } = require("../controllers/auth.controller");
// const { createSession } = require("../utils/session");

const router = new express.Router();

router.post("/register", validateAdminRegisterSchema, register);

// express session object which helps in creating sessions
// router.use(createSession);
router.post("/login", validateAdminLoginSchema, login);

module.exports = router;
