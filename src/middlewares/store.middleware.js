const {
  handleJoiError,
  storeCreateSchema,
  storeGetSchema,
  storeEditSchema,
} = require("../utils/validateschema");
const createError = require("http-errors");

async function validateStoreCreateSchema(req, res, next) {
  try {
    const result = await storeCreateSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateStoreGetSchema(req, res, next) {
  try {
    const result = await storeGetSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateStoreEditSchema(req, res, next) {
  try {
    const result = await storeEditSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

module.exports = {
  validateStoreCreateSchema,
  validateStoreGetSchema,
  validateStoreEditSchema,
};
