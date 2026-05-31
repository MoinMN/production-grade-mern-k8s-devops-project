import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Img404 from "../assets/404.png";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl font-bold mb-4 text-red-500"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-xl text-gray-300 mb-6 text-center"
      >
        {"Oops! The page you're looking for doesn't exist."}
      </motion.p>

      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <img
          src={Img404}
          alt="Page Not Found"
          className="w-80"
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
        onClick={() => navigate("/")}
      >
        Go Home
      </motion.button>
    </div>
  );
};

export default PageNotFound;
