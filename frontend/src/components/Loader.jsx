import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Icon */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-16 h-16 border-4 border-t-blue-500 border-b-purple-500 border-l-transparent border-r-transparent rounded-full mb-6"
            ></motion.div>

            {/* Loader Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="text-white text-xl font-semibold"
            >
                Processing your request...
            </motion.div>
        </div>
    );
};

export default Loader