import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import PropTypes from "prop-types";

const Service = ({ services = [] }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="md:scroll-mt-8 md:pb-12 max-md:py-6"
      id="service"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="montserrat-alternates-semibold my-6 text-3xl md:text-4xl lg:text-5xl md:mx-24 max-md:mx-4"
      >
        What <span className="text-blue-600">Services</span> ?
      </motion.h3>

      <motion.div
        className="flex flex-wrap justify-center gap-6 md:px-24 max-md:px-4 md:py-12 max-md:py-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2, // Staggered appearance for each card
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }}
      >
        {services?.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

// Service component PropTypes
Service.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
};

// ServiceCard component PropTypes
ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

export default Service;
