import { motion, useMotionValue, useTransform } from "framer-motion";
import * as IconsFA from "react-icons/fa";
import * as IconsFA6 from "react-icons/fa6";
import * as IconsIO5 from "react-icons/io5";
import * as IconsGr from "react-icons/gr";
import * as IconsRI from "react-icons/ri";
import * as IconsDI from "react-icons/di";
import * as IconsSI from "react-icons/si";
import PropTypes from 'prop-types';

// fa, fa6, ri, di, si, io5, gr icons imported
const iconLibraries = {
  Fa: IconsFA,
  Fa6: IconsFA6,
  Ri: IconsRI,
  Di: IconsDI,
  Si: IconsSI,
  Io5: IconsIO5,
  Gr: IconsGr
};

// Skill Box Component
const SkillBox = ({ skill }) => {
  // Extract library & icon name
  const [lib, iconName] = skill.icon.split("."); // Eg: "Fa6.FaReact"
  const IconComponent = iconLibraries[lib]?.[iconName];  // Fetch icon

  // Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-20, 20], [-5, 5]); // Rotate based on cursor movement

  // Mouse Move Effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  };

  // Reset on Mouse Leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="flex items-center space-x-3 md:space-x-4 md:px-8 max-md:px-6 py-4 bg-gray-800 rounded-lg"
      style={{ x, y, rotate }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{
        scale: 1.08,
        rotate: 5,
        boxShadow: "0px 0px 30px 6px rgba(37, 99, 235, 0.7)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      // For mobile devices (tap instead of hover)
      whileTap={{
        scale: 1.05,
        boxShadow: "0px 0px 20px 4px rgba(37, 99, 235, 0.7)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      {IconComponent ? (
        <IconComponent className="text-3xl md:text-4xl text-blue-600" />
      ) : (
        <span className="text-gray-400">Icon not found</span>
      )}
      <span className="text-lg md:text-xl font-semibold">{skill.name}</span>
    </motion.div>
  );
};

SkillBox.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired, // e.g., "Fa6.FaReact"
  }).isRequired,
};

export default SkillBox;
