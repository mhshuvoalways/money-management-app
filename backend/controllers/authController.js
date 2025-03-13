const Auth = require("../models/AuthModel");
const Profile = require("../models/ProfileModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serverError = require("../utils/serverError");
const {
  registerValidation,
  loginValidation,
  changePasswordValidation,
} = require("../validations/authValidation");
const defaultCategories = require("../controllers/defaultCategories");
const defalutWallets = require("../controllers/defalutWallets");

const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const validation = registerValidation(req.body);
  if (validation.isValid) {
    Auth.findOne({ email })
      .then((response) => {
        if (!response) {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              serverError(res);
            } else {
              const user = {
                email,
                password: hash,
              };
              new Auth(user)
                .save()
                .then((authRes) => {
                  const userId = authRes._id;
                  new Profile({ user: userId, name: name })
                    .save()
                    .then(() => {
                      const token = jwt.sign(
                        {
                          _id: userId,
                          email: authRes.email,
                        },
                        process.env.SECRET,
                        { expiresIn: "90d" }
                      );
                      res.status(200).json({
                        message: "Registered successfully!",
                        token,
                      });
                      defaultCategories(userId);
                      defalutWallets(userId);
                    })
                    .catch(() => {
                      serverError(res);
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
    Auth.findOne({ email })
      .then((response) => {
        if (response) {
          bcrypt.compare(password, response.password, function (err, result) {
            if (result) {
              const userId = response._id;
              const token = jwt.sign(
                {
                  _id: userId,
                  email: response.email,
                },
                process.env.SECRET,
                { expiresIn: "90d" }
              );
              res.status(200).json({
                message: "Login successfully!",
                token,
              });
              defaultCategories(userId);
              defalutWallets(userId);
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

const changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;
  const validation = changePasswordValidation(req.body);
  if (validation.isValid) {
    Auth.findOne({ _id: userId })
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
                    Auth.findOneAndUpdate(
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
  changePassword,
};
