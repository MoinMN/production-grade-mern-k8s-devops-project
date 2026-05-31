import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.2, // Creates a nice stagger effect
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
