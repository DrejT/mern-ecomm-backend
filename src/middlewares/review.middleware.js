const {
  handleJoiError,
  reviewGetSChema,
  reviewDeleteSchema,
  reviewCreateSChema,
  reviewEditSchema,
  mongoIdObjectSchema,
} = require("../utils/validateschema");

async function validateReviewGetSchema(req, res, next) {
  try {
    const result = await reviewGetSChema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateReviewCreateSchema(req, res, next) {
  try {
    req.body.userid = req.session.user.id;
    const result = await reviewCreateSChema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateReviewEditSchema(req, res, next) {
  try {
    console.log(req.body.reviewId);
    const resultId = await mongoIdObjectSchema.validateAsync(req.body.reviewId);
    const result = await reviewEditSchema.validateAsync(req.body.data);
    req.result = {};
    req.result.data = result;
    req.result.id = resultId;
    console.log(req.result);
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateReviewDeleteSchema(req, res, next) {
  try {
    const result = await reviewDeleteSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

module.exports = {
  validateReviewGetSchema,
  validateReviewCreateSchema,
  validateReviewEditSchema,
  validateReviewDeleteSchema,
};
