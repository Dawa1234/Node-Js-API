const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const bookReviewModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookReviewModel", bookReviewModel);
