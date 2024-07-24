const Profile = require("../models/ProfileModel");
const serverError = require("../utils/serverError");
const { profileUpdateValidation } = require("../validations/profileValidation");

const getMe = (req, res) => {
  Profile.findOne({ user: req.user._id })
    .populate("user")
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
  const user = req.body;
  const validation = profileUpdateValidation(user);
  if (validation.isValid) {
    Profile.findOneAndUpdate({ user: req.user._id }, user, { new: true })
      .populate("user")
      .then((response) => {
        res.status(200).json({
          message: "Profile updated successfully!",
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

module.exports = {
  getMe,
  updateUser,
};
