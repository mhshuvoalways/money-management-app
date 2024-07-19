const WalletModel = require("../models/WalletModel");
const walletValidation = require("../validations/walletValidation");
const serverError = require("../utils/serverError");

const createWallet = (req, res) => {
  const { walletName } = req.body;
  const validation = walletValidation({
    walletName,
  });
  if (validation.isValid) {
    const wallet = { user: req.user._id, walletName };
    new WalletModel(wallet)
      .save()
      .then((response) => {
        res.status(200).json({
          message: "Wallet created successfully",
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

const getWallets = (req, res) => {
  WalletModel.find({ user: req.user._id })
    .then((response) => {
      res.status(200).json({
        response: response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

const updateWallet = (req, res) => {
  const { walletId } = req.params;
  const { walletName } = req.body;
  const validation = walletValidation({
    walletName,
  });
  if (validation.isValid) {
    WalletModel.findOneAndUpdate(
      { _id: walletId },
      { walletName },
      { new: true }
    )
      .then((response) => {
        res.status(200).json({
          message: "Wallet updated successfully",
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

const deleteWallet = (req, res) => {
  const { walletId } = req.params;
  WalletModel.findOneAndDelete({ _id: walletId })
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
  createWallet,
  getWallets,
  updateWallet,
  deleteWallet,
};
