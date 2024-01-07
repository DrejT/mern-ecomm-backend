const { getUserByUsernameSchema } = require("./../utils/validateschema");

async function validateGetUserByUsername(req, res, next) {
  try {
    const result = await getUserByUsernameSchema.validateAsync(
      req.params.username
    );
    req.result = result;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateGetUserByUsername,
};
