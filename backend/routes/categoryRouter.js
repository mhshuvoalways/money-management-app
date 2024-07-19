const router = require("express").Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");

router.post("/category/createCategory", authenticate, createCategory);
router.get("/category/getCategories", authenticate, getCategories);
router.put("/category/updateCategory/:categoryId", authenticate, updateCategory);
router.delete(
  "/category/deleteCategory/:categoryId",
  authenticate,
  deleteCategory
);

module.exports = router;
