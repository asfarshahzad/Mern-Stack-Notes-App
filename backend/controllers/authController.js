import bcrypt from "bcrypt"
import authModel from "../models/authModel.js"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// create new user 
export const createUser = async (req, res) => {
    try {
        const filePath = req.file.path
        const { username, email, password } = req.body

        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            // delete locally saved file
            if (req.file && filePath) {
                fs.unlink(req.file.path, (err) => { });
            }

            return res.status(404).json({ message: "Email already exist." });
        }

        if (!filePath) {
            return res.status(404).json({ message: "Image is required." })
        }
        const imageResult = await cloudinary.uploader.upload(filePath, {
            folder: "uploads",
            allowed_formats: ["jpg", "jpeg", "png", "webp"]
        })

        fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file")
            else console.log("local file deleted successfully")
        })

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await authModel.create({ username, email, password: hashPassword, imageUrl: imageResult.secure_url })

        res.status(201).json({
            message: "account created successfully.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                imageUrl: newUser.imageUrl
            }
        })

    } catch (error) {
        console.log("Error signing in user:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



// login user 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({ message: "Invalid password." })
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        // ✅ Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                imageUrl: user.imageUrl
            }
        });

    } catch (error) {
        console.log("Error logging in user:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// user logout 

export const logOut = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        return res.status(201).json({ message: "User logged out successfully." });
    } catch (error) {
        console.log("Error logging out:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// verify user 
export const verifyUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Access denied. No token found." })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await authModel.findById(decoded.id)
        res.status(200).json({ user: { id: decoded.id, username: user.username, email: user.email, imageUrl: user.imageUrl } });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token.", user: null });
    }
}