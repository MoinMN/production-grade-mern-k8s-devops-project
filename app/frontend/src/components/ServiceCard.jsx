import { motion, useMotionValue, useTransform } from "framer-motion";
import PropTypes from "prop-types";

const ServiceCard = ({ service }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth tilt effect on hover
  const rotateX = useTransform(y, [-75, 75], [15, -15]);
  const rotateY = useTransform(x, [-75, 75], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  return (
    <motion.div
      className="relative w-72 md:w-80 h-52 md:min-h-60 md:p-6 max-md:p-4 flex flex-col gap-3 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800"
      style={{
        rotateX,
        rotateY,
        willChange: "transform, box-shadow",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{
        boxShadow: "0px 0px 25px 6px rgba(59, 130, 246, 0.8)",
        scale: 1.07,
        transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <h4 className="text-lg md:text-xl font-semibold">{service.title}</h4>
      <p className="text-sm md:text-base text-gray-300">{service.content}</p>
    </motion.div>
  );
};

// PropTypes validation
ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string, // optional
    icon: PropTypes.string,    // optional, if you plan to use an icon later
  }).isRequired,
};

export default ServiceCard;