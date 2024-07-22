const router = require("express").Router();
const {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const authenticate = require("../middlewares/authenticate");

router.post("/income/addIncome", authenticate, addIncome);
router.get("/income/getIncomes", authenticate, getIncomes);
router.put("/income/updateIncome/:incomeId", authenticate, updateIncome);
router.delete("/income/deleteIncome/:incomeId", authenticate, deleteIncome);

module.exports = router;
