import jwt from "jsonwebtoken"
import multer from "multer"
import dotenv from "dotenv"
import path from "path"
dotenv.config();

// token verify
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

// profile image 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + "-" + unique + path.extname(file.originalname))
    }
})

export const upload = multer({ storage })