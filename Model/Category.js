const mongoose = require("mongoose");

const CategoryModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookReviewModel",
    },
  ],
});
module.exports = mongoose.model("CategoryModel", CategoryModel);
