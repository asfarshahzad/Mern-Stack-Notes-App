import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../App'; // ✅ App.jsx se import kiya

const Signup = () => {
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profile: null
    });

    const handleSubmit = (e) => {
        const { name, value, files } = e.target;

        if (name === "profile") {
            setFormData((prev) => ({ ...prev, profile: files[0] }))
        }
        else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const createUser = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password || !formData.profile) {
            return showToast("All fields are required.", "error");
        }

        const data = new FormData();
        data.append("username", formData.username)
        data.append("email", formData.email)
        data.append("password", formData.password)
        if (formData.profile) {
            data.append("profile", formData.profile)
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                body: data
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

        setFormData({ username: "", email: "", password: "" });
        document.getElementById("profile").value = "";
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-5 border border-white/20 w-full max-w-md"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-400">Join thousands of organized thinkers</p>
                </motion.div>

                <form onSubmit={createUser} className="space-y-7">

                    {/* Username */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleSubmit}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="Enter your name"
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleSubmit}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="Enter your email"
                        />
                    </motion.div>

                    {/* Password */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleSubmit}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    {/* Profile Image Upload (Modern + Preview) */}

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-2"
                    >
                        <label
                            htmlFor="profile"
                            onClick={() => setIsFocused(true)} // simulate focus
                            className={`cursor-pointer flex flex-col p-3 w-full rounded-lg border ${isFocused ? "border-blue-500" : "border-white/10"
                                } bg-white/5 transition-all hover:bg-white/10`}
                        >
                            {!formData.profile && (
                                <span className="text-gray-400">
                                    Click to upload image <span className="text-[14px]">(PNG, JPG, JPEG)</span>
                                </span>
                            )}

                            {formData.profile && (
                                <span className="text-white text-sm">{formData.profile.name}</span>
                            )}

                            <input
                                type="file"
                                id="profile"
                                name="profile"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                                className="hidden"
                                onChange={(e) => {
                                    handleSubmit(e);
                                    setIsFocused(false); // remove focus after file selected
                                }}
                            />
                        </label>
                    </motion.div>


                    {/* Submit Button */}
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