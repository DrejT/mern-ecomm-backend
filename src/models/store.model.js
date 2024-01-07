const mongoose = require("mongoose");

const Store = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  businessEmail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 250,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

Store.pre("save", async function (next) {
  try {
    if (this.isModified("name")) {
      this.slug = this.name.split(/\s+/).join("-").toLowerCase();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Store", Store);
