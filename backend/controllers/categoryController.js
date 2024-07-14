const CategoryModel = require("../models/CategoryModel");
const categoryValidation = require("../validations/categoryValidation");
const serverError = require("../utils/serverError");

const createCategory = (req, res) => {
  const { categoryName, icon } = req.body;
  const validation = categoryValidation({
    categoryName,
    icon,
  });
  if (validation.isValid) {
    const category = { categoryName, icon };
    new CategoryModel(category)
      .save()
      .then((response) => {
        res.status(200).json({
          message: "Category created successfully",
          response: response,
          token,
        });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getCategory = (req, res) => {
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
  const { categoryName, icon } = req.body;
  const validation = categoryValidation({
    categoryName,
    icon,
  });
  if (validation.isValid) {
    const category = { categoryName, icon };
    CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      { category },
      { new: true }
    )
      .save()
      .then((response) => {
        res.status(200).json({
          message: "Category updated successfully",
          response: response,
        });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const deleteCategory = (req, res) => {
  const { categoryId } = req.params;
  CategoryModel.findOneAndDelete({ _id: categoryId })
    .then((response) => {
      res.status(200).json({
        response: response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
