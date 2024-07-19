const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serverError = require("../utils/serverError");
const {
  registerValidation,
  loginValidation,
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
                    response: {
                      _id: createUser._id,
                      name: createUser.name,
                      email: createUser.email,
                      avatar: createUser.avatar,
                    },
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
                response: {
                  _id: response._id,
                  name: response.name,
                  email: response.email,
                  avatar: response.avatar,
                },
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

const getUser = (req, res) => {
  User.find()
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
