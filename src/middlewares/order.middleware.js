const {
  orderCreateSchema,
  orderGetSchema,
} = require("../utils/validateschema");

async function validateOrderCreateSchema(req, res, next) {
  try {
    req.body.by = req.session.user.id;
    const result = await orderCreateSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    next(error);
  }
}

async function validateOrderGetSchema(req, res, next) {
  try {
    const result = await orderGetSchema.validateAsync(req.session.user.id);
    req.result = result;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateOrderCreateSchema,
  validateOrderGetSchema,
};
