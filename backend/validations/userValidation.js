const axios = require("axios");

const registerValidation = (value) => {
  const error = {};
  if (!value.name) {
    error.name = "Please provide your name";
  }
  if (!value.email) {
    error.email = "Please provide your email";
  }
  if (!value.password) {
    error.password = "Please provide your password";
  } else if (value.password.length < 6) {
    error.password = "Please provide minimum 6 character";
  } else if (value.password.length > 20) {
    error.password = "Please provide maximum 20 character";
  }
  if (!value.recaptcha) {
    error.recaptcha = "Please fill the captch";
  } else {
    axios
      .get(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${value.recaptcha}`
      )
      .then((response) => {
        if (response.data.success) {
          error.recaptcha = '';
        } else {
          error.recaptcha = "Invalid recaptcha";
        }
      })
      .catch(() => {
        error.recaptcha = "Server error occurred!";
      });
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

const loginValidation = (value) => {
  const error = {};
  if (!value.email) {
    error.email = "Please provide your email";
  }
  if (!value.password) {
    error.password = "Please provide your password";
  } else if (value.password.length < 6) {
    error.password = "Please provide minimum 6 character";
  } else if (value.password.length > 20) {
    error.password = "Please provide maximum 20 character";
  }
  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = {
  registerValidation,
  loginValidation,
};
