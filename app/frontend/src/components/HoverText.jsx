import { motion, useMotionValue, animate } from "framer-motion";
import PropTypes from "prop-types";

const HoverText = ({ button }) => {

  // Motion values for text movement
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.2;

    textX.set(offsetX);
    textY.set(offsetY);
  };

  const handleMouseLeave = () => {
    // Smoothly animate back to the center
    animate(textX, 0, { stiffness: 120, damping: 10 });
    animate(textY, 0, { stiffness: 120, damping: 10 });
  };

  return (
    <motion.button
      className="relative px-6 py-3 flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.7 }}
    >
      <motion.span
        className="relative will-change-transform pointer-events-none"
        style={{ x: textX, y: textY }}
      >
        {button}
      </motion.span>
    </motion.button>
  );
};

HoverText.propTypes = {
  button: PropTypes.string.isRequired,
};

export default HoverText;
