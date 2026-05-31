import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Loading = ({ setIsLoading, dataLoaded = false }) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  const [hasCompletedOneCycle, setHasCompletedOneCycle] = useState(false);
  const [canExit, setCanExit] = useState(false);

  useEffect(() => {
    const startAnimation = async () => {
      await Promise.all([
        controls1.start({
          x: ["-100%", "100%"],
          transition: { duration: 3, ease: "easeInOut" },
        }),
        controls2.start({
          x: ["-100%", "100%"],
          transition: { duration: 3, ease: "easeInOut", delay: 0.5 },
        }),
        controls3.start({
          x: ["-100%", "100%"],
          transition: { duration: 3, ease: "easeInOut", delay: 0.8 },
        }),
      ]);
      setHasCompletedOneCycle(true);
    };

    startAnimation();
  }, []);

  const handleUpdate = () => {
    const loadingDiv = document.getElementById("loading-slider");
    if (!loadingDiv) return;

    const { left, right } = loadingDiv.getBoundingClientRect();

    // Check if the animation reaches either side of the screen
    if (left <= 0 || right >= window.innerWidth) {
      setCanExit(true);
    }
  };


  // Hide loader when all conditions are met
  useEffect(() => {
    if (dataLoaded && hasCompletedOneCycle && canExit) {
      setTimeout(() => setIsLoading(false));
    }
  }, [dataLoaded, hasCompletedOneCycle, canExit, setIsLoading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative h-screen w-screen overflow-hidden">
        <motion.div
          id="loading-slider"
          className="absolute top-0 bottom-0 left-0 w-full h-full bg-sky-300"
          animate={controls1}
          onUpdate={handleUpdate}
        />
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-full h-full bg-white"
          animate={controls2}
        />
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-full h-full bg-blue-500"
          animate={controls3}
        />
      </div>
    </div>
  );
};

Loading.propTypes = {
  setIsLoading: PropTypes.func,  // Function to hide the loader
  dataLoaded: PropTypes.bool,               // Whether the data has finished loading
};

export default Loading;
