const router = require("express").Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const authenticate = require("../middlewares/authenticate");

router.post("/expense/addExpense", authenticate, addExpense);
router.get("/expense/getExpenses", authenticate, getExpenses);
router.put("/expense/updateExpense/:expenseId", authenticate, updateExpense);
router.delete("/expense/deleteExpense/:expenseId", authenticate, deleteExpense);

module.exports = router;
