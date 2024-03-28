const express = require("express");

const validators = require("../validators");
const userControllers = require("../controllers/user");
const { requireAuthentication } = require("../middlewares/authCheck");

const router = express.Router();

// User Login
router.post("/login", validators.loginValidator, userControllers.login);

// User Signup
router.post("/signup", validators.signupValidator, userControllers.signup);

// User Logout
router.post("/logout", requireAuthentication, userControllers.logout);

// User Logout from all devices
router.post(
  "/master-logout",
  requireAuthentication,
  userControllers.logoutAllDevices
);

// Refresh Access Token
router.post("/reauth", userControllers.refreshAccessToken);

// Forgot password
router.post(
  "/forgotpass",
  validators.forgotPasswordValidator,
  userControllers.forgotPassword
);

// Reset password
router.patch(
  "/resetpass/:resetToken",
  validators.resetPasswordValidator,
  userControllers.resetPassword
);

// Authenticated user profile
router.get("/me", requireAuthentication, userControllers.fetchAuthUserProfile);

// Get user by ID
router.get(
  "/:id",
  requireAuthentication,
  validators.fetchUserProfileValidator,
  userControllers.fetchUserProfile
);

module.exports = router;
