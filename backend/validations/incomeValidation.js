const incomeValidation = (value) => {
  const error = {};
  if (!value.categoryId) {
    error.categoryId = "Select a category";
  }
  if (!value.date) {
    error.date = "Select a date";
  }
  if (!value.walletId) {
    error.walletId = "Select a wallet";
  }
  if (!value.amount || value.amount <= 0) {
    error.amount = "Write an amount";
  }
  if (!value.description) {
    error.description = "Write a description";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = incomeValidation;
