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
                  new Profile({ user: authRes._id, name: name })
                    .save()
                    .then(() => {
                      const token = jwt.sign(
                        {
                          _id: authRes._id,
                          email: authRes.email,
                        },
                        process.env.SECRET,
                        { expiresIn: "1hr" }
                      );
                      res.status(200).json({
                        message: "Registered successfully!",
                        token,
                      });
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
