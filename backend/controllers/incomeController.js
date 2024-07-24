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
            res.status(200).json({
              message: "Income added successfully",
              response: response,
            });
            let totalWallet = response.wallet.balance;
            totalWallet += Number(amount);
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

const getIncomes = (req, res) => {
  IncomeModel.find({ user: req.user._id }) // will ask to chat gpt that there are any ways to query directly without using filter method
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
    IncomeModel.findOneAndUpdate({ _id: incomeId }, income, { new: true })
      .then((response) => {
        IncomeModel.findOne({ _id: response._id })
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

const deleteIncome = (req, res) => {
  const { incomeId } = req.params;
  IncomeModel.findOneAndDelete({ _id: incomeId })
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
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
};
