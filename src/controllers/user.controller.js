const UserModel = require("./../models/user.model");

async function getUserByUsername(req, res, next) {
  try {
    const user = await UserModel.findOne({ username: req.result });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserByUsername,
};
