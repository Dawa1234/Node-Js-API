const mongoose = require("mongoose");

const bookModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BookModel" , bookModel);
