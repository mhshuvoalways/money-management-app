const WalletModel = require("../models/WalletModel");
const {
  walletValidation,
  transferValidation,
} = require("../validations/walletValidation");
const serverError = require("../utils/serverError");

const createWallet = (req, res) => {
  const { walletName, walletPosition } = req.body;
  const validation = walletValidation({
    walletName,
  });
  if (validation.isValid) {
    const wallet = { user: req.user._id, walletName, walletPosition };
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

const transferWallet = (req, res) => {
  const { fromWalletId, toWalletId, balance } = req.body;
  const validation = transferValidation({
    fromWalletId,
    toWalletId,
    balance,
  });
  if (validation.isValid) {
    const walletUpdates = [];
    const fromWallet = WalletModel.findOneAndUpdate(
      { _id: fromWalletId },
      { $inc: { balance: -balance } },
      { new: true } 
    );
    walletUpdates.push(fromWallet);
    const toWallet = WalletModel.findOneAndUpdate(
      { _id: toWalletId },
      { $inc: { balance: +balance } },
      { new: true }
    );
    walletUpdates.push(toWallet);
    Promise.all(walletUpdates)
      .then((response) => {
        res.status(200).json({
          message: "Amount transferd successfully",
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

const updateWalletAll = (req, res) => {
  const updates = req.body;
  Promise.all(
    updates.map((update) =>
      WalletModel.updateOne({ _id: update._id }, { $set: update })
    )
  )
    .then(() => {
      res.status(200).json({ message: "Wallets updated successfully" });
    })
    .catch(() => {
      serverError(res);
    });
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
  updateWalletAll,
  transferWallet,
  deleteWallet,
};
