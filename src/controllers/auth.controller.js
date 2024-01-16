const UserModel = require("../models/user.model");
const createError = require("http-errors");

async function register(req, res, next) {
  try {
    // const result = await registerAuthSchema.validateAsync(req.body);
    // console.log(result);
    const emailExist = await UserModel.findOne({ email: req.result.email });
    if (emailExist) {
      throw createError.Conflict(`${req.result.email} is already registered`);
    }

    const usernameExist = await UserModel.findOne({
      username: req.result.username,
    });
    if (usernameExist) {
      throw createError.Conflict(
        `${req.result.username} is already registered`
      );
    }

    const user = new UserModel({
      username: req.result.username,
      email: req.result.email,
      password: req.result.password,
      role: req.result.role === "admin" ? "admin" : "user",
    });
    const savedUser = await user.save();
    // const accessToken = await signAccessToken(savedUser.id);
    res.send({ message: "registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    console.log(req.session);
    const user = await UserModel.findById(req.params.id, "-password");
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await UserModel.findOne({ username: req.result.username });
    if (!user) {
      throw createError.NotFound("user is not registered");
    }
    const validPassword = await user.isPasswordValid(req.result.password);
    if (!validPassword) {
      throw createError.Unauthorized("username or password is invalid");
    }
    const stores = user.role === "user" ? null : user.stores;

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      stores: stores,
    };
    req.session.message = "login successful";
    console.log("logged in as", req.session);
    res.status(200).send(req.session.id);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  getUserById,
  login,
};
