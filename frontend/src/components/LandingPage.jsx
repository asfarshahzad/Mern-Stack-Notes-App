import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const navigate = useNavigate();

    const features = [
        { title: "Smart Organization", description: "Automatically categorize and tag your notes", icon: "📁" },
        { title: "Real-time Sync", description: "Access your notes anywhere, anytime", icon: "⚡" },
        { title: "Rich Text Editing", description: "Format your notes with powerful editing tools", icon: "✏️" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 mb-12 lg:mb-0 flex flex-col items-center lg:items-start"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight max-w-xl">
                            Organize Your{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Thoughts
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-md">
                            The ultimate note-taking experience with AI-powered organization,
                            seamless sync, and beautiful design.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/auth/signup")}
                                className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all w-full sm:w-auto"
                            >
                                Get Started
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer px-8 py-4 border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all w-full sm:w-auto"
                            >
                                Watch Demo
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Animated Features */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 relative mt-10 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{
                                        opacity: index === currentFeature ? 1 : 0.3,
                                        x: 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-6 last:mb-0 p-4 rounded-lg bg-white/5"
                                >
                                    <div className="flex items-center justify-center lg:justify-start space-x-4">
                                        <span className="text-2xl">{feature.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                                            <p className="text-gray-400">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full"
                        />
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="container mx-auto px-6 py-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        { value: "50K+", label: "Active Users" },
                        { value: "1M+", label: "Notes Created" },
                        { value: "99.9%", label: "Uptime" },
                    ].map((stat, i) => (
                        <div key={i} className="p-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                            >
                                {stat.value}
                            </motion.div>
                            <p className="text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default LandingPage;