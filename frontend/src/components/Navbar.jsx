import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import userContext from "../context/userContext";
import { showToast } from "../App";
import { createPortal } from "react-dom";

const Navbar = () => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);

    const handleLogout = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setUser(null);
                showToast("Logout successful!", "success");
                navigate("/auth/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const avatar = document.querySelector("#user-avatar");
            const dropdown = document.querySelector("#user-dropdown");

            if (
                dropdown &&
                !dropdown.contains(event.target) &&
                avatar &&
                !avatar.contains(event.target)
            ) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeClass = "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold";
    const inactiveClass = "text-gray-100 hover:text-blue-500";
    const getNavLinkClass = ({ isActive }) => (isActive ? activeClass : inactiveClass);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg border-b border-white/20"
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div
                        className="cursor-pointer flex items-center space-x-4"
                        onClick={() => navigate("/")}
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg cursor-pointer"
                        ></motion.div>
                        <span className="text-xl font-bold">NoteFlow</span>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3">

                        {/* Desktop NavLinks (only if logged in) */}
                        {user && (
                            <div className="hidden md:flex items-center space-x-4 mr-auto">
                                <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                                <NavLink to="/myNotes" className={getNavLinkClass}>My Notes</NavLink>
                                <NavLink to="/createNote" className={getNavLinkClass}>Create Note</NavLink>
                            </div>
                        )}

                        {/* Desktop Login / Signup (only if NOT logged in) */}
                        {!user && (
                            <div className="hidden md:flex items-center space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/auth/login")}
                                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all cursor-pointer text-white"
                                >
                                    Login
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/auth/signup")}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all cursor-pointer"
                                >
                                    Signup
                                </motion.button>
                            </div>
                        )}

                        {/* Avatar visible if user logged in OR (logged out but on mobile) */}
                        {(user || !user) && (
                            <div className={`${!user ? "md:hidden" : "block"} relative ml-4`} ref={dropdownRef}>
                                <motion.div
                                    id="user-avatar"
                                    whileHover={{ scale: 1.07 }}
                                    onClick={() => setOpenMenu((prev) => !prev)}
                                    className="cursor-pointer w-9 h-9 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-semibold text-white"
                                >
                                    {user ? user.email.charAt(0).toUpperCase() : "U"}
                                </motion.div>

                                {/* DROPDOWN PORTAL */}
                                {openMenu &&
                                    createPortal(
                                        <motion.div
                                            id="user-dropdown"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="fixed top-[70px] right-6 sm:right-8 md:right-10 lg:right-12
                                            w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/30
                                            py-2 px-3 text-gray-900 z-[999999] flex flex-col items-start"
                                        >

                                            {/* Mobile Nav Links if logged in */}
                                            {user && (
                                                <div className="flex flex-col w-full md:hidden mb-2">
                                                    <NavLink to="/" className={({ isActive }) =>
                                                        isActive ? "font-semibold text-blue-600 py-2" : "py-2 text-gray-900"
                                                    }
                                                        onClick={() => setOpenMenu(false)}
                                                    >
                                                        Home
                                                    </NavLink>

                                                    <NavLink to="/myNotes" className={({ isActive }) =>
                                                        isActive ? "font-semibold text-blue-600 py-2" : "py-2 text-gray-900"
                                                    }
                                                        onClick={() => setOpenMenu(false)}
                                                    >
                                                        My Notes
                                                    </NavLink>

                                                    <NavLink to="/createNote" className={({ isActive }) =>
                                                        isActive ? "font-semibold text-blue-600 py-2" : "py-2 text-gray-900"
                                                    }
                                                        onClick={() => setOpenMenu(false)}
                                                    >
                                                        Create Note
                                                    </NavLink>
                                                </div>
                                            )}

                                            {/* Guest Mobile → Login & Signup */}
                                            {!user && (
                                                <div className="flex flex-col w-full mb-2 space-y-2">
                                                    <button
                                                        onClick={() => { navigate("/auth/login"); setOpenMenu(false); }}
                                                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-300 transition-all cursor-pointer text-gray-900 hover:text-blue-600"
                                                    >
                                                        Login
                                                    </button>
                                                    <button
                                                        onClick={() => { navigate("/auth/signup"); setOpenMenu(false); }}
                                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all cursor-pointer"
                                                    >
                                                        Signup
                                                    </button>
                                                </div>
                                            )}

                                            {/* Logout Only for logged in */}
                                            {user && (
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleLogout}
                                                    className="w-full p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                                                >
                                                    <FiLogOut className="text-blue-600" />
                                                    <span className="text-blue-600 font-medium">Logout</span>
                                                </motion.button>
                                            )}
                                        </motion.div>,
                                        document.body
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;