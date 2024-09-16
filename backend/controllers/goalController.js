const GoalModel = require("../models/GoalModel");
const {
  goalValidation,
  contributionValidation,
} = require("../validations/goalValidation");
const serverError = require("../utils/serverError");
const cron = require("node-cron");

const createGoal = (req, res) => {
  const { goalName, targetAmount, saved, contribution, contributionType } =
    req.body;
  const validation = goalValidation({
    goalName,
    targetAmount,
    saved,
    contribution,
  });
  if (validation.isValid) {
    const contributions = [];
    contributions.push({
      contribution,
      date: new Date(),
    });
    const obj = {
      goalName,
      targetAmount,
      saved,
      contributions,
      contributionType,
    };
    const goalObj = { user: req.user._id, ...obj };
    new GoalModel(goalObj)
      .save()
      .then((response) => {
        res.status(200).json({
          message: "Goal created successfully",
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

const createContribution = (req, res) => {
  const { goalId } = req.params;
  const { contribution, contributions } = req.body;
  const validation = contributionValidation({
    contribution,
  });
  if (validation.isValid) {
    contributions.push({
      contribution,
      date: new Date(),
    });
    const goalObj = { contributions };
    GoalModel.findOneAndUpdate({ _id: goalId }, goalObj, { new: true })
      .then((response) => {
        res.status(200).json({
          message: "Contribution added successfully",
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

const getGoals = (req, res) => {
  GoalModel.find({ user: req.user._id })
    .then((response) => {
      res.status(200).json({
        response: response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

const updateMonthlyContributions = async () => {
  try {
    const goals = await GoalModel.find({ contributionType: "Automatic" });
    for (let goal of goals) {
      if (goal.targetAmount > goal.contribution + goal.saved) {
        const newAmount = goal.contribution + goal.contribution;
        await GoalModel.findOneAndUpdate(
          { _id: goal._id },
          { contribution: newAmount }
        );
      }
    }
    console.log("Contributions updated successfully");
  } catch (error) {
    console.error("Error updating contributions", error);
  }
};

cron.schedule("59 23 28-31 * *", async () => {
  const today = new Date();
  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  if (today.getDate() === lastDayOfMonth) {
    await updateMonthlyContributions();
  }
});

const updateGoals = (req, res) => {
  const { goalId } = req.params;
  const goal = req.body;
  const validation = goalValidation(goal);
  if (validation.isValid) {
    GoalModel.findOneAndUpdate({ _id: goalId }, goal, { new: true })
      .then((response) => {
        res.status(200).json({
          message: "Goal updated successfully",
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

const deleteGoal = (req, res) => {
  const { goalId } = req.params;
  GoalModel.findOneAndDelete({ _id: goalId })
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
  createGoal,
  getGoals,
  updateGoals,
  createContribution,
  deleteGoal,
};
