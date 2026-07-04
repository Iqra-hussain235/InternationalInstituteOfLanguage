import express from "express";
import { register, login } from "../controllers/authController.js";
// import { googleLogin } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/google", googleLogin);

export default router;