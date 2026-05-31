import { motion, useMotionValue, useTransform } from "framer-motion";
import HoverText from "./HoverText";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  return (
    <motion.div
      className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg flex flex-col min-w-[320px] sm:min-w-[400px] md:min-w-[500px] sm:max-w-[450px] md:max-w-[550px] snap-start cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05, rotateX: 0, rotateY: 0, transition: { duration: 0.3 } }}
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((clientX - centerX) / 2);
        y.set((clientY - centerY) / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-44 md:h-56 object-cover"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Project Details */}
      <motion.div
        className="flex-grow md:px-4 max-md:px-3 md:py-2 max-md:py-1.5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.3 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-500">
          {project.title}
        </h4>
        <p className="text-gray-300 mt-2 text-justify text-sm md:text-base leading-normal">
          {project.content}
        </p>
        <div className="flex flex-wrap mt-2 text-xs md:text-sm">
          {project?.technology?.map((skill, i) => (
            <span key={i} className="bg-blue-600 text-white px-2 py-1 rounded-full mr-2 mt-2">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        className="flex justify-between md:px-3 max-md:px-2 md:py-2 max-md:py-1.5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.3 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {project?.githubLink &&
          <Link
            to={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            <HoverText button={"GitHub ↗"} />
          </Link>
        }
        {project?.appLink &&
          <Link
            to={project.appLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition duration-200"
          >
            <HoverText button={"Live App ↗"} />
          </Link>
        }
        {project?.websiteLink &&
          <Link
            to={project.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition duration-200"
          >
            <HoverText button={"Live Website ↗"} />
          </Link>
        }
      </motion.div>
    </motion.div>
  );
};

// PropTypes validation
ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    image: PropTypes.string,
    githubLink: PropTypes.string,
    websiteLink: PropTypes.string,
    appLink: PropTypes.string,
    technology: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProjectCard;