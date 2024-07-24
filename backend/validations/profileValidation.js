const profileUpdateValidation = (value) => {
  const error = {};
  if (!value.name) {
    error.name = "Name is required";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = {
  profileUpdateValidation,
};
