const joi = require("joi");

const usernameSchema = joi.string().alphanum().max(15).lowercase().required();
const emailSchema = joi.string().email().lowercase().required();
const passwordSchema = joi.string().min(8).required();
const roleSchema = joi.string().valid("admin");

function handleJoiError(error) {
  if (error.isJoi === true) {
    error.status = 422;
    return error;
  }
  return;
}

const mongoIdObjectSchema = joi.string().length(24);

// for auth routes
const registerAuthSchema = joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginAuthSchema = joi.object({
  username: usernameSchema,
  password: passwordSchema,
});

// admin schemas
const adminRegisterSchema = joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

const adminLoginSchema = joi.object({
  username: usernameSchema,
  password: passwordSchema,
});

// user schemas

const getUserByUsernameSchema = usernameSchema;

// store schemas

const storeNameSchema = joi.string().max(250).lowercase();
const storeEmailSchema = joi.string().email().lowercase();
const storeDescriptionSchema = joi.string().min(10);

const storeCreateSchema = joi.object({
  name: storeNameSchema.required(),
  businessEmail: storeEmailSchema.required(),
  description: storeDescriptionSchema.required(),
});

const storeGetSchema = mongoIdObjectSchema.required();

const storeEditSchema = joi.object({
  name: storeNameSchema,
  businessEmail: storeEmailSchema,
  description: storeDescriptionSchema,
});

const storeDeleteSchema = mongoIdObjectSchema.required();

// item schemas

const itemNameSchema = joi.string().max(250);
const itemDescrptionSchema = joi.string().max(500);
const itemImageSchema = joi.any();
const itemSaleSchema = joi.number();
const itemPriceSchema = joi.number();
const itemQuantitySchema = joi.number();
const itemOnShelfSchema = joi.boolean();

const ItemCreateSchema = joi.object({
  name: itemNameSchema.required(),
  storeId: mongoIdObjectSchema.required(),
  description: itemDescrptionSchema.required(),
  itemImage: itemImageSchema,
  sale: itemSaleSchema.required(),
  price: itemPriceSchema.required(),
  quantity: itemQuantitySchema.required(),
  onShelf: itemOnShelfSchema.required(),
});

const itemGetSchema = mongoIdObjectSchema.required();
const itemGetAllSchema = joi.array().items(mongoIdObjectSchema.required());

const itemEditSchema = joi.object({
  itemId: mongoIdObjectSchema,
  name: itemNameSchema,
  description: itemDescrptionSchema,
  itemImage: itemImageSchema,
  sale: itemSaleSchema,
  price: itemPriceSchema,
  quantity: itemQuantitySchema,
  onShelf: itemOnShelfSchema,
});

const itemDeleteSchema = mongoIdObjectSchema.required();

// order schemas

const orderForSchema = mongoIdObjectSchema;
const orderBySchema = mongoIdObjectSchema;
const orderStoreIdSchema = mongoIdObjectSchema;
const orderStateSchema = joi.string().valid("Maharashtra", "Gujarat", "Goa");
const OrderCitySchema = joi.string();
const orderPincodeSchema = joi.string().length(6);
const orderAddress1Schema = joi.string();
const orderAddress2Schema = joi.string().min(0);

const orderCreateSchema = joi.object({
  for: orderForSchema.required(),
  by: orderBySchema.required(),
  storeId: orderStoreIdSchema.required(),
  state: orderStateSchema.required(),
  city: OrderCitySchema.required(),
  pincode: orderPincodeSchema.required(),
  address1: orderAddress1Schema.required(),
  address2: orderAddress2Schema,
});

const orderGetSchema = orderBySchema;
// review schemas

const reviewCommentSchema = joi.string().max(500);
const reviewRatingSchema = joi.number().max(5).min(1);
const reviewItemSchema = mongoIdObjectSchema;
const reviewUserSchema = mongoIdObjectSchema;

const reviewGetSChema = mongoIdObjectSchema.required();

const reviewCreateSChema = joi.object({
  comment: reviewCommentSchema,
  rating: reviewRatingSchema.required(),
  item: reviewItemSchema.required(),
  userid: reviewUserSchema.required(),
});

const reviewEditSchema = joi.object({
  comment: reviewCommentSchema,
  rating: reviewRatingSchema,
});

const reviewDeleteSchema = mongoIdObjectSchema.required();

module.exports = {
  // handle unprocessed request
  handleJoiError,
  mongoIdObjectSchema,

  // auth and admin schema
  registerAuthSchema,
  loginAuthSchema,
  adminRegisterSchema,
  adminLoginSchema,

  // user Schemas
  getUserByUsernameSchema,

  // store schemas
  storeCreateSchema,
  storeGetSchema,
  storeEditSchema,
  storeDeleteSchema,

  // item schemas
  ItemCreateSchema,
  itemGetSchema,
  itemGetAllSchema,
  itemEditSchema,
  itemDeleteSchema,

  // order schemas

  orderCreateSchema,
  orderGetSchema,

  // review Schemas

  reviewGetSChema,
  reviewCreateSChema,
  reviewEditSchema,
  reviewDeleteSchema,
};
