const express = require("express");
const {
  userLogin,
  refreshToken,
  userLogout,
  me,
  userRegister,
} = require("../controllers/authController");

const router = express.Router();

// routing
router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.route("/refresh").get(refreshToken);
router.route("/logout").post(userLogout);

// export
module.exports = router;
