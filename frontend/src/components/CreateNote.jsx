import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { showToast } from "../App"; // App.jsx se import
import Footer from "./Footer";

const CreateNote = ({ notes, setNotes, user, onLogout }) => {
    const [inpVal, setInpVal] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    const addNote = async (e) => {
        e.preventDefault();
        if (!inpVal.title.trim() || !inpVal.description.trim())
            return showToast("Title and description are required!", "error");

        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/notes/add`, {
                method: "POST",
                body: JSON.stringify(inpVal),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const result = await response.json();

            if (response.ok && result) {
                // Toast show pehle
                showToast("Note added successfully!", "success");

                // Notes state update
                setNotes((prev) => [...prev, result.data]);

                // Thodi der ke baad redirect
                setTimeout(() => {
                    navigate("/myNotes");
                }, 1300); // toast duration ke equal delay
            } else {
                showToast("Failed to add note!", "error");
            }
        } catch (error) {
            showToast("Internal Server Error!", "error");
        }

        setInpVal({ title: "", description: "" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Navbar */}
            <Navbar user={user} onLogout={onLogout} />

            {/* Center Container */}
            <div className="flex flex-1 justify-center items-center px-4 sm:px-6 lg:px-8">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20"
                    >
                        {/* Heading */}
                        <h2 className="flex items-center justify-center text-2xl md:text-3xl font-bold mb-6 text-white/90 drop-shadow-sm space-x-3">
                            <span className="text-4xl">📝</span>
                            <span>Create a New Note</span>
                        </h2>

                        {/* Inputs */}
                        <div className="space-y-5">
                            <input
                                type="text"
                                value={inpVal.title}
                                onChange={(e) =>
                                    setInpVal({ ...inpVal, title: e.target.value })
                                }
                                placeholder="Enter note title..."
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
                            />

                            <textarea
                                value={inpVal.description}
                                onChange={(e) =>
                                    setInpVal({ ...inpVal, description: e.target.value })
                                }
                                placeholder="Enter note description..."
                                rows="5"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none shadow-inner"
                            />
                        </div>

                        {/* Button */}
                        <div className="flex justify-center mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={addNote}
                                className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                            >
                                Create Note
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    );
};

export default CreateNote;