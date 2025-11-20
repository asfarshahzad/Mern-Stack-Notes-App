import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg border-t border-white/20 text-gray-200 py-6"
        >
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0">

                <p className="text-sm text-gray-400 text-center md:text-left">
                    &copy; {new Date().getFullYear()} NotesApp. All rights reserved.
                </p>

                <p className="text-sm text-gray-400 text-center md:text-left">
                    Created by <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Asfar Shahzad</span>
                </p>
            </div>
        </motion.footer>
    );
};

export default Footer;