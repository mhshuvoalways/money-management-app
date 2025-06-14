const router = require("express").Router();
const {
  createWallet,
  getWallets,
  updateWallet,
  updateWalletAll,
  transferWallet,
  deleteWallet,
} = require("../controllers/walletController");
const authenticate = require("../middlewares/authenticate");

router.post("/wallet/createWallet", authenticate, createWallet);
router.get("/wallet/getWallets", authenticate, getWallets);
router.put("/wallet/updateWallet/:walletId", authenticate, updateWallet);
router.put("/wallet/updateWalletAll", authenticate, updateWalletAll);
router.put("/wallet/transferWallet", authenticate, transferWallet);
router.delete("/wallet/deleteWallet/:walletId", authenticate, deleteWallet);

module.exports = router;
