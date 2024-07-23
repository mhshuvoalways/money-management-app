const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serverError = require("../utils/serverError");
const {
  registerValidation,
  loginValidation,
  userUpdateValidation,
  changePasswordValidation,
} = require("../validations/userValidation");

const registerUser = (req, res) => {
  const { name, email, password, recaptcha } = req.body;
  const validation = registerValidation({
    name,
    email,
    password,
    recaptcha,
  });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (!response) {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              serverError(res);
            } else {
              const user = {
                name,
                email,
                password: hash,
              };
              new User(user)
                .save()
                .then((createUser) => {
                  const token = jwt.sign(
                    {
                      _id: createUser._id,
                      email: createUser.email,
                    },
                    process.env.SECRET,
                    { expiresIn: "1hr" }
                  );
                  res.status(200).json({
                    message: "Registered successfully!",
                    response,
                    token,
                  });
                })
                .catch(() => {
                  serverError(res);
                });
            }
          });
        } else {
          res.status(400).json({
            message: "User already exist!",
          });
        }
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const validation = loginValidation({ email, password });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (response) {
          bcrypt.compare(password, response.password, function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  _id: response._id,
                  email: response.email,
                },
                process.env.SECRET,
                { expiresIn: "1hr" }
              );
              res.status(200).json({
                message: "Login successfully!",
                response,
                token,
              });
            } else {
              res.status(400).json({
                message: "Password doesn't match!",
              });
            }
            if (err) {
              serverError(res);
            }
          });
        } else {
          res.status(400).json({
            message: "User not found!",
          });
        }
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getMe = (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("-password")
    .then((response) => {
      res.status(200).json({
        response,
      });
    })
    .catch(() => {
      serverError(res);
    });
};

const updateUser = (req, res) => {
  const userId = req.params.userId;
  const user = req.body;
  const validation = userUpdateValidation(user);
  if (validation.isValid) {
    User.findOneAndUpdate({ _id: userId }, user, { new: true })
      .then((response) => {
        res.status(200).json({
          message: "User updated successfully!",
          response,
        });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;
  const validation = changePasswordValidation(req.body);
  if (validation.isValid) {
    User.findOne({ _id: userId })
      .then((response) => {
        if (response) {
          bcrypt.compare(
            currentPassword,
            response.password,
            function (err, result) {
              if (result) {
                bcrypt.hash(newPassword, 10, function (err, hash) {
                  if (err) {
                    serverError(res);
                  } else {
                    User.findOneAndUpdate(
                      { _id: userId },
                      { password: hash },
                      { new: true }
                    )
                      .then(() => {
                        res.status(200).json({
                          message: "Password changed successfully!",
                        });
                      })
                      .catch(() => {
                        serverError(res);
                      });
                  }
                });
              } else {
                res.status(400).json({
                  message: "Current password doesn't match!",
                });
              }
              if (err) {
                serverError(res);
              }
            }
          );
        } else {
          res.status(400).json({
            message: "User not found!",
          });
        }
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  changePassword,
};
