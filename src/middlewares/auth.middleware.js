const {
  registerAuthSchema,
  loginAuthSchema,
} = require("./../utils/validateschema");
const createError = require("http-errors");

async function validateRegisterSchema(req, res, next) {
  try {
    const result = await registerAuthSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function validateLoginSchema(req, res, next) {
  try {
    const result = await loginAuthSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError("Invalid username or password"));
    }
    next(error);
  }
}

module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
};
