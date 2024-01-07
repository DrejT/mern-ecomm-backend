const {
  adminRegisterSchema,
  adminLoginSchema,
} = require("./../utils/validateschema");
const createError = require("http-errors");

async function validateAdminRegisterSchema(req, res, next) {
  try {
    const result = await adminRegisterSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function validateAdminLoginSchema(req, res, next) {
  try {
    const result = await adminLoginSchema.validateAsync(req.body);
    req.result = result;
    console.log(result);
    next();
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError("Invalid username or password"));
    }
    next(error);
  }
}

module.exports = {
  validateAdminRegisterSchema,
  validateAdminLoginSchema,
};
