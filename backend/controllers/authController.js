import bcrypt from "bcrypt"
import authModel from "../models/authModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

// create new user 
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await authModel.findOne({ email })
        if (existingUser) {
            return res.status(404).json({ message: "Email already exist." })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await authModel.create({ username, email, password: hashPassword })

        res.status(201).json({
            message: "account created successfully.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
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
                email: user.email
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
export const verifyUser = (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Access denied. No token found." })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        res.status(200).json({ user: { id: decoded.id, username: decoded.username, email: decoded.email } });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token.", user: null });
    }
}