import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import PropTypes from "prop-types";

const Project = ({ projects = [] }) => {
  const containerRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = containerRef.current.offsetWidth;
      setDragLimit(viewportWidth - containerWidth - 120);
    }
  }, [projects]);

  return (
    <section className="scroll-mt-2 flex flex-col" id="project">
      {/* Title */}
      <motion.h3
        className="montserrat-alternates-semibold my-6 text-3xl md:text-4xl lg:text-5xl md:mx-24 max-md:mx-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        My <span className="text-blue-600">Projects</span>
      </motion.h3>

      {/* Horizontally Scrollable & Draggable Container */}
      <motion.div
        ref={containerRef}
        className="relative overflow-hidden md:py-8 max-md:py-6 md:px-24 max-md:px-4"
      >
        <motion.div
          className="flex space-x-4 md:space-x-6"
          drag="x"
          dragConstraints={{ left: dragLimit, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects?.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// PropTypes validation
Project.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      image: PropTypes.string,
      githubLink: PropTypes.string,
      websiteLink: PropTypes.string,
      appLink: PropTypes.string,
      technology: PropTypes.arrayOf(PropTypes.string),
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ),
};

export default Project;
