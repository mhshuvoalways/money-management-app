const categoryValidation = (value) => {
  const error = {};

  if (!value.categoryName) {
    error.categoryName = "Please provide category name";
  }

  if (!value.categoryType) {
    error.categoryType = "Please provide category type";
  }

  if (!value.icon.emoji) {
    error.icon = { ...error.icon, emoji: "Please select an icon" };
  }
  if (!value.icon.bgColor) {
    error.icon = {
      ...error.icon,
      bgColor: "Please select the background color",
    };
  }

  const isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = categoryValidation;
