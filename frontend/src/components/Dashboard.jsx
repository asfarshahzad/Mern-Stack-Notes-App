import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Swal from "sweetalert2";
import { FiFilePlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { showToast } from '../App'; // direct import kiya toast function
import Footer from './Footer';

const Dashboard = ({ notes, setNotes }) => {
    const [editingNote, setEditingNote] = useState(null)
    const [editContent, setEditContent] = useState({ title: "", description: "" })
    const [loading, setLoading] = useState(true)
    const [showEmpty, setShowEmpty] = useState(false)
    const [viewNote, setViewNote] = useState(null)      // <-- NEW STATE FOR MODAL
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = async () => {
        setLoading(true)
        setShowEmpty(false)
        try {
            const response = await fetch(`${apiUrl}/notes/get`, {
                method: "GET",
                credentials: "include",
            });
            const result = await response.json();
            if (response.ok && result) {
                setNotes(result)
            } else {
                showToast("Error fetching notes", "error");
            }
        } catch (error) {
            showToast("Internal Server Error", "error");
        }
        setLoading(false)

        setTimeout(() => {
            setShowEmpty(true)
        }, 500)
    }

    const deleteNote = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This note will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3b82f6",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${apiUrl}/notes/delete/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                const resData = await response.json();

                if (response.ok && resData) {
                    setNotes((prev) => prev.filter((item) => item._id !== id));
                    showToast("Note deleted successfully", "success");
                } else {
                    showToast("Error deleting note", "error");
                }
            } catch (error) {
                showToast("Internal Server Error", "error");
            }
        }
    };

    const startEditing = (note) => {
        setEditContent({ ...editContent, title: note.title, description: note.description })
        setEditingNote(note._id)
    }

    const cancelEditing = () => {
        setEditingNote(null)
        setEditContent({ title: "", description: "" })
    }

    const saveEdit = async (id) => {
        if (!editContent.title.trim() || !editContent.description.trim())
            return showToast("Title and description are required!", "error");

        try {
            const response = await fetch(`${apiUrl}/notes/update/${id}`, {
                method: "PATCH",
                body: JSON.stringify(editContent),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const result = await response.json();
            if (response.ok && result) {
                setNotes((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? { ...item, title: editContent.title, description: editContent.description }
                            : item
                    )
                );
                setEditingNote(null);
                showToast("Note updated successfully", "success");
            } else showToast("Error updating note", "error");
        } catch (error) {
            showToast("Internal Server Error", "error");
        }
    }

    const getColorClass = (index) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-green-500 to-green-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
            'from-yellow-400 to-yellow-500'
        ];
        return colors[index % colors.length];
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const capitalizedWord = (str) => { return str.split(" ").map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" "); }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            <Navbar />

            <div className="flex-1 container mx-auto px-6 py-8 overflow-x-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">My Notes</h1>
                            <p className="text-gray-400 font-semibold mt-2">{notes.length} {notes.length === 1 ? 'Note' : 'Notes'} Found</p>
                        </div>
                        {
                            notes.length ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/createNote")}
                                    className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
                                >
                                    <FiFilePlus />
                                    <span>Add Note</span>
                                </motion.button>
                            )
                                : (null)
                        }
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-10 gap-6"
                >
                    <AnimatePresence>
                        {loading
                            ? (notes.length > 0 ? notes : [1, 2, 3, 4]).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-white/10 rounded-xl p-6 min-h-[200px] animate-pulse"
                                />
                            ))
                            : notes.length > 0
                                ? notes.map((note, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.01, y: -2 }}
                                        className={`bg-gradient-to-br ${getColorClass(index)} rounded-xl p-5 backdrop-blur-lg border border-white/20 min-h-[200px] flex flex-col`}
                                    >
                                        {editingNote === note._id ? (
                                            <div className="flex-1 flex flex-col">
                                                <input
                                                    type="text"
                                                    value={editContent.title}
                                                    onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
                                                    className="w-full px-3 py-2 bg-white/20 rounded-lg text-white font-semibold mb-3 focus:outline-none focus:bg-white/30"
                                                    autoFocus
                                                />
                                                <textarea
                                                    value={editContent.description}
                                                    onChange={(e) => setEditContent({ ...editContent, description: e.target.value })}
                                                    className="flex-1 w-full px-3 py-2 bg-white/20 rounded-lg text-white text-sm focus:outline-none focus:bg-white/30 resize-none"
                                                    rows="3"
                                                />
                                                <div className="flex justify-end items-center mt-2 pt-3 border-t border-white/20 space-x-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => saveEdit(note._id)}
                                                        className="cursor-pointer px-3 py-2 bg-blue-500 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-all"
                                                    >
                                                        Save
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={cancelEditing}
                                                        className="cursor-pointer px-3 py-2 bg-gray-500 rounded-lg font-semibold text-sm hover:bg-gray-600 transition-all"
                                                    >
                                                        Cancel
                                                    </motion.button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{capitalizedWord(note.title)}</h3>
                                                    <p className="text-white/80 mb-4 line-clamp-2 flex-1 whitespace-pre-wrap break-words overflow-hidden">
                                                        {note.description}
                                                    </p>
                                                </div>

                                                {/* Bottom buttons */}
                                                <div className="flex justify-between items-center text-white/60 text-sm mt-auto pt-3 border-t border-white/20">
                                                    <div>Created: {formatDate(note.createdAt)}</div>
                                                    <div className="flex space-x-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => startEditing(note)}
                                                            className="cursor-pointer px-2 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center text-lg"
                                                        >
                                                            <FiEdit2 />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => deleteNote(note._id)}
                                                            className="cursor-pointer px-2 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center text-lg"
                                                        >
                                                            <FiTrash2 />
                                                        </motion.button>
                                                    </div>
                                                </div>

                                                {/* Full-width View Note button with Eye icon */}
                                                <motion.button
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 1 }}
                                                    onClick={() => setViewNote(note)}
                                                    className="cursor-pointer mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white text-sm font-semibold"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                    <span>View Note</span>
                                                </motion.button>
                                            </>
                                        )}
                                    </motion.div>
                                ))
                                : showEmpty && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                        className="col-span-full text-center py-16 overflow-x-hidden"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="text-6xl mb-4"
                                        >
                                            📝
                                        </motion.div>
                                        <h3 className="text-2xl font-semibold mb-2">No notes yet</h3>
                                        <p className="text-gray-400 mb-6">Create your first note to get started</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate("/createNote")}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                                        >
                                            Create Your First Note
                                        </motion.button>
                                    </motion.div>
                                )
                        }
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* ---------------- VIEW MODAL ---------------- */}
            <AnimatePresence>
                {viewNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4"
                        onClick={() => setViewNote(null)} // <- click on backdrop closes modal
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white text-gray-900 rounded-2xl w-full max-w-xl p-6 shadow-xl relative"
                            onClick={(e) => e.stopPropagation()} // <- prevent click inside modal from closing
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setViewNote(null)}
                                className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                            >
                                ✖
                            </button>

                            <h2 className="text-2xl font-bold mb-4">{capitalizedWord(viewNote.title)}</h2>

                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4 break-words">
                                {viewNote.description}
                            </p>

                            <div className="text-sm text-gray-400 text-right">
                                Created: {formatDate(viewNote.createdAt)}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* ---------------- VIEW MODAL END ---------------- */}

            <Footer />
        </div>
    )
}

export default Dashboard;