import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        trim: true
    }
}, {
    timestamps: true
})

const notesModel = mongoose.model("Note", notesSchema)

export default notesModel