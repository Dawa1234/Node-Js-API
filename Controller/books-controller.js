const books = require("../Data/books");

// -------------------- Route "/" ---------------------------------------------

// Get Books
const getAllBooks = (req, res) => {
  res.json(books);
};

// Send book.
const sendBook = (req, res) => {
  let newBook = {
    id: books[books.length - 1].id + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(401).send(newBook);
};

const DeleteAllBooks = (req, res) => {
  res.json(books);
};

// -------------------- Route "/:id" ---------------------------------------------

// Get Books (Get)
const getAllBooksId = (req, res) => {
  let foundBook = books.find((item) => {
    return item.id == req.params.id;
  });
  if (foundBook == undefined) {
    res.send(`404 Not found! (No data found in id: ${req.params.id})`);
    return;
  }
  res.json(foundBook);
};

// Send book (Post)
const postBooks = (req, res) => {
  res.status(501).send(`Cannot send books with id (Id: ${req.params.id})`);
};

// Update books (Put)
const updateIdBooks = (req, res) => {
  let updateBook = books.map((item) => {
    if (item.id == req.params.id) {
      item.title = req.body.title;
      item.author = req.body.author;
    }
    return item;
  });

  res.json(updateBook);
};

// Delete book id (Delete)
const DeleteIdBooks = (req, res) => {
  // Show all the data except the given Id. (Delete)
  let deleteBook = books.filter((item) => {
    return item.id != req.params.id;
  });

  // let deleteBook = books.filter(item => item.id != req.params.id);
  res.json(deleteBook);
};

module.exports = {
  getAllBooks,
  sendBook,
  DeleteAllBooks,
  getAllBooksId,
  postBooks,
  updateIdBooks,
  DeleteIdBooks,
};
