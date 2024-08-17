const walletValidation = (value) => {
  const error = {};
  if (!value.walletName) {
    error.walletName = "Please provide wallet name";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

const transferValidation = (value) => {
  const error = {};
  if (!value.balance) {
    error.balance = "Write balance you want to transfer";
  }
  if (!value.fromWalletId) {
    error.fromWalletId = "This field is required";
  }
  if (!value.toWalletId) {
    error.toWalletId = "This field is required";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = {
  walletValidation,
  transferValidation,
};
