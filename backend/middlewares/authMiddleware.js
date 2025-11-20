import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(404).json({ message: "Access denied. No token found." })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({ message: "Invalid or expired token." });
    }
}