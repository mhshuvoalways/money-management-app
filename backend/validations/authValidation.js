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
          error.recaptcha = "";
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

const changePasswordValidation = (value) => {
  const error = {};
  if (!value.currentPassword) {
    error.currentPassword = "Provide current password";
  }
  if (!value.newPassword) {
    error.newPassword = "Provide new password";
  } else if (value.newPassword.length < 6) {
    error.newPassword = "Please provide minimum 6 character";
  } else if (value.newPassword.length > 20) {
    error.newPassword = "Please provide maximum 20 character";
  }
  if (!value.confirmPassword) {
    error.confirmPassword = "Provide confirm password";
  } else if (value.confirmPassword.length < 6) {
    error.confirmPassword = "Please provide minimum 6 character";
  } else if (value.confirmPassword.length > 20) {
    error.confirmPassword = "Please provide maximum 20 character";
  }
  if (value.newPassword !== value.confirmPassword) {
    error.message = "New password & confirm password doesn't match!";
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
  changePasswordValidation,
};
