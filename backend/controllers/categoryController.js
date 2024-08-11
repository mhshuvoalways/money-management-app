const CategoryModel = require("../models/CategoryModel");
const categoryValidation = require("../validations/categoryValidation");
const serverError = require("../utils/serverError");

const createCategory = (req, res) => {
  const category = req.body;
  const validation = categoryValidation(category);
  if (validation.isValid) {
    category.user = req.user._id;
    new CategoryModel(category)
      .save()
      .then((response) => {
        res.status(200).json({
          message: "Category created successfully",
          response,
        });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getCategories = (req, res) => {
  CategoryModel.find({ user: req.user._id })
    .then((response) => {
      res.status(200).json({
        response: response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

const updateCategory = (req, res) => {
  const { categoryId } = req.params;
  const category = req.body;
  const validation = categoryValidation(category);
  if (validation.isValid) {
    CategoryModel.findOneAndUpdate({ _id: categoryId }, category, { new: true })
      .then((response) => {
        res.status(200).json({
          message: "Category updated successfully",
          response,
        });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const updateCategoryAll = (req, res) => {
  const updates = req.body;
  Promise.all(
    updates.map((update) => 
      CategoryModel.updateOne({ _id: update._id }, { $set: update })
    )
  )
    .then(() => {
      res.status(200).json({ message: 'Categories updated successfully' });
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteCategory = (req, res) => {
  const { categoryId } = req.params;
  CategoryModel.findOneAndDelete({ _id: categoryId })
    .then((response) => {
      res.status(200).json({
        message: "Category deleted successfully",
        response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  updateCategoryAll,
  deleteCategory,
};
