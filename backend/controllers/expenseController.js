const ExpenseModel = require("../models/ExpenseModel");
const WalletModel = require("../models/WalletModel");
const incomeValidation = require("../validations/incomeValidation");
const serverError = require("../utils/serverError");

const addExpense = (req, res) => {
  const { categoryId, walletId, date, amount, description } = req.body;
  const validation = incomeValidation(req.body);
  if (validation.isValid) {
    const expense = {
      user: req.user._id,
      category: categoryId,
      wallet: walletId,
      date,
      amount,
      description,
    };
    new ExpenseModel(expense)
      .save()
      .then((response) => {
        ExpenseModel.findOne({ _id: response._id })
          .populate("category")
          .populate("wallet")
          .then((response) => {
            res.status(200).json({
              message: "Income added successfully",
              response: response,
            });
            let totalWallet = response.wallet.balance;
            totalWallet -= Number(amount);
            WalletModel.findOneAndUpdate(
              { _id: walletId },
              { balance: totalWallet }
            ).exec();
          })
          .catch(() => {
            serverError(res);
          });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getExpenses = (req, res) => {
  ExpenseModel.find({ user: req.user._id })
    .populate("wallet")
    .populate("category")
    .then((response) => {
      res.status(200).json({
        response: response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const { categoryId, walletId, date, amount, description } = req.body;
  const validation = incomeValidation(req.body);
  if (validation.isValid) {
    const expense = {
      user: req.user._id,
      category: categoryId,
      wallet: walletId,
      date,
      amount,
      description,
    };
    ExpenseModel.findOneAndUpdate({ _id: expenseId }, expense, { new: true })
      .then((response) => {
        ExpenseModel.findOne({ _id: response._id })
          .populate("category")
          .populate("wallet")
          .then((response) => {
            res.status(200).json({
              message: "Income updated successfully",
              response: response,
            });
          })
          .catch(() => {
            serverError(res);
          });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  ExpenseModel.findOneAndDelete({ _id: expenseId })
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
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
