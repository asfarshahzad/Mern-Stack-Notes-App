import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import notesRouter from "./routes/notesRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // frontend URL
        credentials: true
    })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

// Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`Server is running on this PORT http://localhost:${PORT}`)
);