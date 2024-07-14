const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

router.post("/user/registerUser", registerUser);
router.post("/user/loginUser", loginUser);
router.get("/user/getUsers", authenticate, getUser);

module.exports = router;
