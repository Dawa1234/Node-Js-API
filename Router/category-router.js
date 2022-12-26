const express = require("express");
const categoryController = require("../Controller/category-Controller");
const appRoute = express.Router();

// categoryController routing
appRoute
  .route("/")
  .get(categoryController.getCategory)
  .post(categoryController.createCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

appRoute
  .route("/:categoryId")
  .get(categoryController.getCategorybyId)
  .post(categoryController.createCategory)
  .put(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategory);

module.exports = appRoute;
