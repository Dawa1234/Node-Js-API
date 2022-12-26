const book = require("../Model/Book_review");

// -------------------- Get Function --------------------
// (Get) function get by id
const fetchBookById = (req, res, next) => {
  book
    .findById(req.params.id)
    .populate("category")
    .then((books) => res.json(books))
    .catch((err) => next(err));
};

const fetchBooks = (req, res, next) => {
  book
    .find()
    .then((books) => res.json(books))
    .catch((err) => next(err));
};
const fetchBookReview = (req, res, next) => {
  book
    .findById(req.params.id)
    // .findById(req.params.id)
    .then((books) => {
      res.json(books);
      console.log(books);
    })
    .catch((err) => next(err));
};

// -------------------- Post Function --------------------
// Post Function
const createBook = (req, res, next) => {
  // let data = {
  //   title: "data",
  //   author: "auther",
  // };
  book
    .create(req.body)
    .then((books) => res.status(201).json(books))
    .catch((err) => next(err));
};

// Post Function Review book
const createBookReview = (req, res, next) => {
  book
    .findById(req.params.id)
    .then((books) => {
      // req.body = the data passed by users
      books.reviews.push(req.body);
      books.save().then((B) => {
        res.json(B.reviews);
      });
    })
    .catch((err) => next(err));
};

// -------------------- Put Function --------------------
// (Put) Update by id
// {new : ture} to show updated json data
const updateIdBooks = (req, res, next) => {
  book
    .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((books) => res.status(201).json(books))
    .catch((err) => next(err));
};
// -------------------- Delete Function --------------------
// Delete by Id
const deleteBooksbyId = (req, res, next) => {
  book
    .findByIdAndDelete(req.params.id, { new: true })
    .then((books) => res.status(201).json(books))
    .catch((err) => next(err));
};
// Delete all data
const deleteBooks = (req, res, next) => {
  book
    .deleteMany()
    .then((books) => res.status(201).json(books))
    .catch((err) => next(err));
};
// Delete Review data
const deleteBookReview = (req, res, next) => {
  book
    .findByIdAndDelete(req.params.id, { new: true })
    .then((books) => res.status(201).json(books))
    .catch((err) => next(err));
};

// Get Reviews by Id
const getReviewsById = (req, res, next) => {
  // console.lo
  book
    .findById(req.params.id)
    .then((books) => {
      // console.log(books.reviews);
      res.json(books.reviews.id(req.params.reviewId));
    })
    .catch((err) => next(err));
};

// Put Reviews by Id
const updateReviewsById = (req, res, next) => {
  console.log("Reaced");
  book
    .findById(req.params.id)
    .then((book) => {
      let updatedBook = book.reviews.map((item) => {
        if (item.id == req.params.reviewId) {
          item.body = req.body.body;
        }
        return item;
      });
      book.reviews = updatedBook;
      book.save().then((bookUpdated) => res.json(bookUpdated.reviews));
    })
    .catch((err) => next(err));
};
// Delete Reviews by Id
const deleteReviewsById = (req, res, next) => {
  book
    .findById(req.params.id)
    .then((Book) => {
      let deletedBook = Book.reviews.filter((item) => {
        return item.id != req.params.reviewId;
      });
      Book.reviews = deletedBook;
      Book.save().then((b) => res.json(b));
    })
    .catch((err) => next(err));
};

module.exports = {
  fetchBooks,
  fetchBookById,
  createBook,
  deleteBooksbyId,
  updateIdBooks,
  deleteBooks,
  deleteBookReview,
  createBookReview,
  fetchBookReview,
  getReviewsById,
  updateReviewsById,
  deleteReviewsById,
};
