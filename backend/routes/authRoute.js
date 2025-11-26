import express from "express";
import { createUser, loginUser, logOut, verifyUser } from "../controllers/authController.js";
import { upload } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send(`${new Date().toLocaleString()} => Auth API`);
});

// Auth endpoints
router.post("/signup", upload.single("profile"), createUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.get("/verify", verifyUser);

export default router;