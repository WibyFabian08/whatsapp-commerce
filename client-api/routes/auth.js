const express = require("express");
const router = express.Router();

const authController = require("../controllers/api/authController");
const useAuthToken = require("../middlewares/useAuthToken");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.put("/forgot-password", useAuthToken, authController.forgotPassword);

module.exports = router;
