const WalletModel = require("../models/WalletModel");

const walltes = [
  {
    walletName: "Card",
  },
  {
    walletName: "Cash",
  },
  {
    walletName: "PayPal",
  },
  {
    walletName: "Payoneer",
  },
  {
    walletName: "Investments",
  },
];

const defaultWallets = (userId) => {
  if (userId) {
    const newArray = walltes.map((wallet) => ({
      user: userId,
      ...wallet,
    }));
    WalletModel.findOne({ user: userId })
      .then((response) => {
        if (!response) {
          WalletModel.insertMany(newArray)
            .then(() => {})
            .catch(() => {});
        }
      })
      .catch(() => {});
  }
};

module.exports = defaultWallets;
