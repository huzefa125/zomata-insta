const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// User routes
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// Food Partner routes
router.post("/foodPartner/register", authController.registerFoodPartner);
router.post("/foodPartner/login", authController.loginFoodPartner);
router.get("/foodPartner/logout",authController.logoutUser);
module.exports = router;
