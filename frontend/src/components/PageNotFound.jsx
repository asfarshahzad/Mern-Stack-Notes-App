import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const PageNotFound = () => {
    const navigate = useNavigate()

    const floatingShapes = [
        { emoji: '📝', delay: 0, duration: 4 },
        { emoji: '🔍', delay: 0.5, duration: 3.5 },
        { emoji: '📚', delay: 1, duration: 4.5 },
        { emoji: '🎯', delay: 1.5, duration: 3.8 },
        { emoji: '🚀', delay: 2, duration: 4.2 },
        { emoji: '💫', delay: 2.5, duration: 3.7 },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            {/*Navbar*/}
            <div className='w-full'>
                <Navbar />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {floatingShapes.map((shape, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            y: Math.random() * 100 + 50,
                            x: Math.random() * 100 - 50
                        }}
                        animate={{
                            opacity: [0.3, 0.7, 0.3],
                            y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                            x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: shape.duration,
                            delay: shape.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute text-4xl opacity-30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    >
                        {shape.emoji}
                    </motion.div>
                ))}

                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto mt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    {/* Animated 404 Text */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-9xl font-bold mb-4"
                    >
                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(59, 130, 246, 0.5)",
                                    "0 0 40px rgba(139, 92, 246, 0.8)",
                                    "0 0 20px rgba(59, 130, 246, 0.5)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient-x"
                        >
                            404
                        </motion.span>
                    </motion.div>

                    {/* Lost Astronaut Animation */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-6xl mb-6"
                    >
                        🚀
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Page Lost in Space!
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl text-gray-300 mb-8 max-w-md mx-auto leading-relaxed"
                    >
                        The page you're looking for has drifted off into the digital cosmos.
                        Don't worry, even the best notes get lost sometimes!
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/')}
                            className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2 group"
                        >
                            <span>🏠</span>
                            <span>Back to Home</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="group-hover:block"
                            >
                                →
                            </motion.span>
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(-1)}
                            className="cursor-pointer px-8 py-4 border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center space-x-2 group"
                        >
                            <span>↶</span>
                            <span>Go Back</span>
                        </motion.button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="mt-12 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
                    >
                        <h3 className="text-lg font-semibold mb-4 text-gray-300">
                            Quick Navigation
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { label: 'Home', path: '/', emoji: '📊' },
                                { label: 'New Note', path: '/createNote', emoji: '✨' },
                                { label: 'My Notes', path: '/myNotes', emoji: '📚' },
                            ].map((link, index) => (
                                <motion.button
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    onClick={() => navigate(link.path)}
                                    className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
                                >
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                        {link.emoji}
                                    </div>
                                    <div className="font-medium">{link.label}</div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Help Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="mt-8 text-gray-400 text-sm"
                    >
                        <p>If you believe this is an error, contact support or check the URL.</p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating Help Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-20"
                onClick={() => window.open('mailto:support@noteflow.com', '_blank')}
            >
                <span className="text-xl">💬</span>
            </motion.button>
        </div>
    )
}

export default PageNotFound