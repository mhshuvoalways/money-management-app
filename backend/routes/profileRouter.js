const router = require("express").Router();
const {
  getMe,
  updateUser,
} = require("../controllers/profileController");
const authenticate = require("../middlewares/authenticate");

router.get("/profile/getMe", authenticate, getMe);
router.put("/profile/updateUser", authenticate, updateUser);

module.exports = router;
