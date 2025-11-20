import express from "express";
import { createUser, loginUser, logOut, verifyUser } from "../controllers/authController.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send(`${new Date().toLocaleString()} => Auth API`);
});

// Auth endpoints
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.get("/verify", verifyUser);

export default router;