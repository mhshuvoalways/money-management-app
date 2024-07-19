const incomeValidation = (value) => {
  const error = {};
  if (!value.date) {
    error.date = "Please select a date";
  }
  if (!value.amount) {
    error.amount = "Please provide the amount";
  }
  if (!value.description) {
    error.description = "Please provide the description";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = incomeValidation;
