const CategoryModel = require("../Model/Category");

const getCategory = (req, res, next) => {
  CategoryModel.find()
    .populate("books")
    .then((categories) => res.json(categories))
    .catch((err) => next(err));
};
const getCategorybyId = (req, res, next) => {
  CategoryModel.findById(req.params.categoryId)
    .populate("books")
    .then((categories) => res.json(categories))
    .catch((err) => next(err));
};
const createCategory = (req, res, next) => {
  CategoryModel.create(req.body)
    .then((category) => res.json(category))
    .catch((err) => next(err));
};

const updateCategory = (req, res, next) => {
  res.status(501).send("Not Implemented");
};
const updateCategoryById = (req, res, next) => {
  CategoryModel.findByIdAndUpdate(
    req.params.categoryId,
    { $set: req.body },
    { new: true }
  )
    .then((books) => res.status(201).json(books))
    .catch((err) => next(err));
};

const deleteCategory = (req, res, next) => {};

module.exports = {
  getCategory,
  getCategorybyId,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryById,
};
