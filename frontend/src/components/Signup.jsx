import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../App'; // ✅ App.jsx se import kiya

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.username || !userData.email || !userData.password) {
            return showToast("All fields are required.", "error");
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            if (response.ok && result) {
                showToast("Account created successfully!", "success"); // ✅ Signup success toast
                setTimeout(() => { navigate("/auth/login"); }, 1300);
            } else {
                showToast(result.message || "Signup failed", "error"); // ✅ Signup fail toast
            }
        } catch (error) {
            showToast("Internal Server Error", "error"); // ✅ Server error toast
        }

        setUserData({ username: "", email: "", password: "" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 w-full max-w-md"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-400">Join thousands of organized thinkers</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <input
                            type="text"
                            name="name"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="Enter your full name"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="Enter your email"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="cursor-pointer w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                        Create Account
                    </motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-6"
                >
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Sign in
                        </button>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-4"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to home
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Signup;