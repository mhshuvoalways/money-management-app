const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  changePassword,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

router.post("/user/registerUser", registerUser);
router.post("/user/loginUser", loginUser);
router.get("/user/getMe", authenticate, getMe);
router.put("/user/updateUser/:userId", authenticate, updateUser);
router.put("/user/changePassword", authenticate, changePassword);

module.exports = router;
