import notesModel from "../models/notesModel.js"

// add note
export const addNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description } = req.body

        const newNote = await notesModel.create({ userId, title, description })

        res.status(201).json({
            message: "Note added successfully.",
            user: { _id: newNote._id, title: newNote.title, description: newNote.description }
        });

    } catch (error) {
        console.log("Error adding note:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// fetch all notes
export const getNotes = async (req, res) => {
    try {
        const userId = req.user.id;

        const notes = await notesModel.find({ userId }).sort({ createdAt: -1 });

        res.status(201).json(notes)

    } catch (error) {
        console.log("Error fetching notes:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// delete note by id 
export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const userId = req.user.id;

        const deletedNote = await notesModel.findOneAndDelete({
            _id: noteId,
            userId: userId
        });

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found or unauthorized." });
        }

        res.status(200).json({
            message: "Note deleted successfully.",
            deletedNote
        });

    } catch (error) {
        console.log("Error deleting note:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// update note by id 
export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const userId = req.user.id;
        const { title, description } = req.body;

        const updatedNote = await notesModel.findOneAndUpdate(
            { _id: noteId, userId: userId },
            { title, description },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found or unauthorized." });
        }

        res.status(200).json({
            message: "Note updated successfully.",
            updatedNote
        });

    } catch (error) {
        console.log("Error updating note:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// delete all notes
export const deleteAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;

        const deleted = await notesModel.deleteMany({ userId });

        res.status(200).json({
            message: "All notes deleted successfully.",
            deleted
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};