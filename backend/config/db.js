import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectDB = async () => {
    const url = process.env.DB_URL;
    try {
        await mongoose.connect(url)
        console.log("DB Connected.")

    } catch (error) {
        console.log("DB Connection Error.", error.message)
    }
}

export default connectDB