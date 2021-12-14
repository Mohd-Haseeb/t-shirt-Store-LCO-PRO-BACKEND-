const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  adminGetOneUser,
  adminGetAllUsers,
  adminUpdateOneUserDetails,
  adminDeleteOneUser,
  managerGetAllUsers,
} = require("../controllers/userController");

const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails); // middleware is used to verify if the user is logged in or not
// router.route('/password/update').post(isLoggedIn,changePassword);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateUserDetails);

// admin only routes
router
  .route("/admin/users")
  .get(isLoggedIn, customRole("admin"), adminGetAllUsers);

router
  .route("/admin/user/:id")
  .get(isLoggedIn, customRole("admin"), adminGetOneUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateOneUserDetails)
  .delete(isLoggedIn, customRole('admin', adminDeleteOneUser));

// manager only routes
router
  .route("/manager/users")
  .get(isLoggedIn, customRole("manager"), managerGetAllUsers);

module.exports = router;