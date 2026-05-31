import { motion, useMotionValue, animate } from "framer-motion";
import PropTypes from "prop-types";

const ActionButton = ({ button }) => {
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.2;

    textX.set(offsetX);
    textY.set(offsetY);

    btnX.set(offsetX * 2);
    btnY.set(offsetY * 2);
  };

  const handleMouseLeave = () => {
    // Stop ongoing motion before resetting values
    textX.stop();
    textY.stop();
    btnX.stop();
    btnY.stop();

    animate(textX, 0, { duration: 0.4, ease: "easeOut" });
    animate(textY, 0, { duration: 0.4, ease: "easeOut" });
    animate(btnX, 0, { duration: 0.4, ease: "easeOut" });
    animate(btnY, 0, { duration: 0.4, ease: "easeOut" });
  };

  return (
    <motion.button
      className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center 
      rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out 
      text-base md:text-lg lg:text-xl montserrat-alternates-semibold relative overflow-hidden shadow-md"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.2,
        boxShadow: "0px 0px 40px 10px rgba(37, 99, 235, 0.7)", // Fixing shadow effect
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      // for mobile device hover does work so addition use tap
      whileTap={{
        scale: 0.8,
        boxShadow: "0px 0px 20px 4px rgba(37, 99, 235, 0.7)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      style={{ x: btnX, y: btnY }}
    >
      <motion.span
        className="relative will-change-transform select-none"
        style={{ x: textX, y: textY }}
      >
        {button}
      </motion.span>
    </motion.button >
  );
};

ActionButton.propTypes = {
  button: PropTypes.string.isRequired,
};

export default ActionButton;
