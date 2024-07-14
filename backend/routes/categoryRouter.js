const router = require("express").Router();
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");

router.post("/category/createCategory", authenticate, createCategory);
router.get("/category/getCategory", authenticate, getCategory);
router.post("/category/updateCategory", authenticate, updateCategory);
router.delete("/category/deleteCategory", authenticate, deleteCategory);

module.exports = router;
