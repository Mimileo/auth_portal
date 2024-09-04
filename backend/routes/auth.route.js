// routes/auth.route.js
import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"
import multerConfig from '../middleware/multerConfig.js'; 

const router = express.Router();

// handle authentication - caalled whnever we refresh the page
// if we have a token then we call the next function, which is check auth
router.get("/check-auth", verifyToken, checkAuth);

router.put('/update-profile', verifyToken, multerConfig.uploadSingle, updateProfile);
router.post("/signup", signup);

router.post("/login", login);


router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);





export default router;