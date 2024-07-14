const categoryValidation = (value) => {
  const error = {};
  if (!value.categoryName) {
    error.categoryName = "Please provide category name";
  }
  if (!value.icon.emoji) {
    error.icon.emoji = "Please select an icon";
  } else if (!value.icon.bgColor) {
    error.icon.bgColor = "Please select the background color";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = categoryValidation;
