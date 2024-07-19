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
  
  module.exports = walletValidation;
  