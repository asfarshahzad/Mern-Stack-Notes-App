import express from "express";
import {
    addNote,
    deleteAllNotes,
    deleteNote,
    getNotes,
    updateNote
} from "../controllers/notesController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send(`${new Date().toLocaleString()} => Notes API`);
});

// Notes endpoints (all protected)
router.post("/add", verifyToken, addNote);
router.get("/get", verifyToken, getNotes);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.patch("/update/:noteId", verifyToken, updateNote);
router.delete("/deleteAll", verifyToken, deleteAllNotes);

export default router;