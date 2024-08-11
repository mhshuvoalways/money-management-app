const WalletModel = require("../models/WalletModel");

const walltes = [
  {
    walletName: "Card",
    walletPosition: 1,
  },
  {
    walletName: "PayPal",
    walletPosition: 2,
  },
  {
    walletName: "Payoneer",
    walletPosition: 3,
  },
  {
    walletName: "Cash",
    walletPosition: 4,
  },
  {
    walletName: "Investments",
    walletPosition: 5,
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
