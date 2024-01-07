const mongoose = require("mongoose");

const Item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  sale: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  onShelf: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

Item.pre("save", async function (next) {
  try {
    if (this.isModified("name")) {
      this.slug = this.name.split(/\s+/).join("-").toLowerCase();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Item", Item);
