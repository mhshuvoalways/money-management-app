const router = require("express").Router();
const {
  createGoal,
  getGoals,
  updateGoals,
  createContribution,
  deleteGoal,
} = require("../controllers/goalController");
const authenticate = require("../middlewares/authenticate");

router.post("/goal/createGoal", authenticate, createGoal);
router.get("/goal/getGoals", authenticate, getGoals);
router.put("/goal/updateGoal/:goalId", authenticate, updateGoals);
router.put(
  "/goal/createContribution/:goalId",
  authenticate,
  createContribution
);
router.delete("/goal/deleteGoal/:goalId", authenticate, deleteGoal);

module.exports = router;
