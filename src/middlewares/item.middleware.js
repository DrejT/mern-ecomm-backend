const itemModel = require("../models/item.model");
require("dotenv").config();
const axios = require("axios");
const {
  ItemCreateSchema,
  itemGetSchema,
  itemEditSchema,
  mongoIdObjectSchema,
  itemDeleSchema,
  itemGetAllSchema,
} = require("./../utils/validateschema");
const { handleJoiError } = require("./../utils/validateschema");
// const ax = require("../utils/axios");

async function validateItemCreateSchema(req, res, next) {
  try {
    const result = await ItemCreateSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemGetSchema(req, res, next) {
  try {
    const result = await itemGetSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemGetAllSchema(req, res, next) {
  try {
    if (req.session.user.stores.length === 0) {
      return res.status(200).send("no stores to fetch");
    }
    const result = await itemGetAllSchema.validateAsync(
      req.session.user.stores
    );
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemEditSchema(req, res, next) {
  try {
    const result = await itemEditSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemDeleteSchema(req, res, next) {
  try {
    const result = await itemDeleSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function uploadImage(req, res, next) {
  try {
    // console.log("logging image in upload", req.file);
    // const base64String = req.file.buffer.toString("base64");
    // const formdata = new FormData();
    // formdata.append("image", base64String);
    // const res = await axios.post(
    //   `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    //   formdata,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       // key: process.env.IMGBB_API_KEY,
    //     },
    //   }
    // );
    // console.log("res is", res);
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

module.exports = {
  validateItemCreateSchema,
  validateItemGetSchema,
  validateItemGetAllSchema,
  validateItemEditSchema,
  validateItemDeleteSchema,
  uploadImage,
};
