const IncomeModel = require("../models/IncomeModel");
const WalletModel = require("../models/WalletModel");
const incomeValidation = require("../validations/incomeValidation");
const serverError = require("../utils/serverError");

const addIncome = (req, res) => {
  const { categoryId, walletId, date, amount, description } = req.body;
  const validation = incomeValidation(req.body);
  if (validation.isValid) {
    const income = {
      user: req.user._id,
      category: categoryId,
      wallet: walletId,
      date,
      amount,
      description,
    };
    new IncomeModel(income)
      .save()
      .then((response) => {
        IncomeModel.findOne({ _id: response._id })
          .populate("category")
          .populate("wallet")
          .then((response) => {
            let balance = Number(amount) + response.wallet.balance;
            WalletModel.findOneAndUpdate({ _id: walletId }, { balance })
              .then(() => {
                res.status(200).json({
                  message: "Income added successfully",
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

const getIncomes = (req, res) => {
  IncomeModel.find({ user: req.user._id })
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

const updateIncome = (req, res) => {
  const { incomeId } = req.params;
  const { categoryId, walletId, date, amount, description } = req.body;
  const convertToNumber = Number(amount);
  const validation = incomeValidation(req.body);
  if (validation.isValid) {
    const income = {
      category: categoryId,
      wallet: walletId,
      date,
      amount: convertToNumber,
      description,
    };
    IncomeModel.findOne({ _id: incomeId })
      .populate("wallet")
      .then((oldIncome) => {
        if (!oldIncome) {
          return res.status(404).json({ message: "Income not found" });
        }
        const oldWalletId = oldIncome.wallet ? oldIncome.wallet._id : null;
        const updateOldWalletBalance = oldWalletId
          ? WalletModel.findOneAndUpdate(
              { _id: oldWalletId },
              { $inc: { balance: -oldIncome.amount } }
            )
          : Promise.resolve();
        const updateNewWalletBalance = WalletModel.findOneAndUpdate(
          { _id: walletId },
          { $inc: { balance: convertToNumber } }
        );
        Promise.all([updateOldWalletBalance, updateNewWalletBalance])
          .then(() => {
            return IncomeModel.findOneAndUpdate({ _id: incomeId }, income, {
              new: true,
            })
              .populate("category")
              .populate("wallet");
          })
          .then((updatedIncome) => {
            res.status(200).json({
              message: "Income updated successfully",
              response: updatedIncome,
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

const deleteIncome = (req, res) => {
  const { incomeId } = req.params;
  IncomeModel.findOneAndDelete({ _id: incomeId })
    .populate("wallet")
    .then((response) => {
      const newBalance = response.wallet.balance - response.amount;
      WalletModel.findOneAndUpdate(
        { _id: response.wallet._id },
        { balance: newBalance }
      )
        .then(() => {
          res.status(200).json({
            message: "Income deleted successfully",
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
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
};
