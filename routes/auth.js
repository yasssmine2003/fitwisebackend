const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.me);
router.put("/change-password", protect, authController.changePassword);
router.get("/refresh", protect, authController.refreshToken);
router.get("/logout", protect, authController.logout);

module.exports = router;