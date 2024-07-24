const router = require("express").Router();
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

router.post("/auth/registerUser", registerUser);
router.post("/auth/loginUser", loginUser);
router.put("/auth/changePassword", authenticate, changePassword);

module.exports = router;
