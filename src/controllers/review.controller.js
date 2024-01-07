const ItemModel = require("../models/item.model");
const ReviewModel = require("./../models/review.model");

async function getReview(req, res, next) {
  try {
    const review = await ReviewModel.findById(req.result);
    if (!review) {
      return res.status(404).send("review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

async function getUserReview(req, res, next) {
  try {
    const reviews = await ReviewModel.find({ item: req.params.itemId });
    if (!reviews) {
      return res.status(200).send("No reviews available");
    }
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
}

async function getAllReview(req, res, next) {
  try {
    const reviews = await ReviewModel.find({});
    if (!reviews) {
      return res.status(200).send("No reviews available");
    }
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const item = await ItemModel.findById(req.result.item);
    if (!item) {
      return res.status(404).send("item not found");
    }
    const review = new ReviewModel(req.result);
    if (!review) {
      return res.status(404).send("review not found");
    }
    review.username = req.session.user.username;
    await review.save();
    item.reviews.push(review);
    await item.save();
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

async function editReview(req, res, next) {
  try {
    const review = await ReviewModel.findByIdAndUpdate(
      { _id: req.result.id },
      req.result.data,
      { new: true }
    );
    if (!review) {
      return res.status(404).send("review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    console.log(req.result);
    const review = await ReviewModel.deleteOne({ _id: req.result });
    if (!review) {
      return res.status(404).send("review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getReview,
  getUserReview,
  getAllReview,
  createReview,
  editReview,
  deleteReview,
};
