const axios = require("axios");

const ax = axios.create({
  baseUrl: "https://api.imgbb.com",
});

module.exports = ax;
