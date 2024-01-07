require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function signAccessToken(userUid) {
  return new Promise((resolve, reject) => {
    const payload = {
      userid,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "1h",
      issuer: process.env.TOKEN_ISSUER,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        return reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
}

module.exports = {
  signAccessToken,
};
