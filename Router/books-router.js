const express = require("express");
const booksController = require("../Controller/books-controller");
// Importing Books Data
const booksModelController = require("../Controller/bookModelController");
const books = require("../Data/books");
const { verifyUser, verifyAdmin } = require("../Middleware/auth");
// const books = require("../Data/books");

const appRoute = express.Router();

appRoute
  .route("/")
  .get(booksModelController.fetchBooks)
  .post(booksModelController.createBook)
  .delete(verifyUser, verifyAdmin, booksModelController.deleteBooks);

// route with id.
appRoute
  .route("/:id")
  // Get json data through 'id' route.
  .get(booksModelController.fetchBookById)
  // Cannot send data to same id.
  .post(booksModelController.createBook)
  // Update
  .put(booksModelController.updateIdBooks)

  .delete(booksModelController.deleteBooksbyId);

// Review Route
appRoute
  .route("/:id/reviews")
  .get(booksModelController.fetchBookReview)
  .post(booksModelController.createBookReview)
  .put((res, req) => {
    res.status(501).json("Not implemented!");
  })
  .delete(booksModelController.deleteBookReview);

// Review Route with id
appRoute
  .route("/:id/reviews/:reviewId")
  .get(booksModelController.getReviewsById)
  .post((res, req) => {
    res.status(501).json("Not implemente!");
  })
  .put(booksModelController.updateReviewsById)
  .delete(booksModelController.deleteReviewsById);

module.exports = appRoute;
