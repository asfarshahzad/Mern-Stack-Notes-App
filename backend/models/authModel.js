import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

const authModel = mongoose.model("User", authSchema)

export default authModel