const transferValidation = (value) => {
    const error = {};
    if (!value.balance) {
      error.balance = "Write balance you want to transfer";
    }

    let isValid = Object.keys(error).length === 0;
    return {
      error,
      isValid,
    };
  };
  
  module.exports = transferValidation;
  