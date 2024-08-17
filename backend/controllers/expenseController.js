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
            let balance = response.wallet.balance - Number(amount);
            WalletModel.findOneAndUpdate({ _id: walletId }, { balance })
              .then(() => {
                res.status(200).json({
                  message: "Expense added successfully",
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
  const convertToNumber = Number(amount);
  const validation = incomeValidation(req.body);
  if (validation.isValid) {
    const expense = {
      category: categoryId,
      wallet: walletId,
      date,
      amount: convertToNumber,
      description,
    };
    ExpenseModel.findOne({ _id: expenseId })
      .populate("wallet")
      .then((oldExpense) => {
        const walletUpdates = [];
        if (oldExpense.wallet) {
          const updateOldWallet = WalletModel.findOneAndUpdate(
            { _id: oldExpense.wallet._id },
            { balance: oldExpense.wallet.balance + oldExpense.amount }
          );
          walletUpdates.push(updateOldWallet);
        }
        const updateNewWallet = WalletModel.findOneAndUpdate(
          { _id: walletId },
          { $inc: { balance: -convertToNumber } }
        );
        walletUpdates.push(updateNewWallet);
        Promise.all(walletUpdates)
          .then(() => {
            ExpenseModel.findOneAndUpdate({ _id: expenseId }, expense, { new: true })
              .populate("category")
              .populate("wallet")
              .then((updatedExpense) => {
                res.status(200).json({
                  message: "Expense updated successfully",
                  response: updatedExpense,
                });
              })
              .catch(() => {
                serverError(res);
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
    .populate("wallet")
    .then((response) => {
      const newBalance = response.wallet.balance + response.amount;
      WalletModel.findOneAndUpdate(
        { _id: response.wallet._id },
        { balance: newBalance }
      )
        .then(() => {
          res.status(200).json({
            message: "Expense deleted successfully",
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
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
