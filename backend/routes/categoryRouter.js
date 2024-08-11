const router = require("express").Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  updateCategoryAll,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");

router.post("/category/createCategory", authenticate, createCategory);
router.get("/category/getCategories", authenticate, getCategories);
router.put(
  "/category/updateCategory/:categoryId",
  authenticate,
  updateCategory
);
router.put("/category/updateCategoryAll", authenticate, updateCategoryAll);
router.delete(
  "/category/deleteCategory/:categoryId",
  authenticate,
  deleteCategory
);

module.exports = router;
