import { motion, useMotionValue, useTransform } from "framer-motion";
import PropTypes from "prop-types";

const TestimonialCard = ({ testimonial }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // More distinct tilt per corner
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
      className="relative max-w-md mx-auto md:p-6 max-md:p-3 rounded-2xl bg-gray-800 shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out"
      style={{
        rotateX,
        rotateY,
        willChange: "transform, box-shadow",
        zIndex: 10,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{
        boxShadow: "0px 0px 30px 10px rgba(37, 99, 235, 0.6)",
        scale: 1.1,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      whileTap={{
        boxShadow: "0px 0px 30px 10px rgba(37, 99, 235, 0.6)",
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={testimonial.profile}
            alt={testimonial.name}
            className="w-10 md:w-14 h-10 md:h-14 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h4 className="font-semibold text-lg md:text-xl text-blue-700">
              {testimonial.name}
            </h4>
            <p className="text-sm md:text-base text-gray-300 italic">
              {`"${testimonial.comment}"`}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Testimonial = ({ testimonials }) => {
  return (
    <>
      <motion.section
        id="testimonial"
        className="scroll-mt-12 my-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h3
          className="montserrat-alternates-semibold md:my-6 max-md:my-0 text-3xl md:text-4xl lg:text-5xl md:mx-24 max-md:mx-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          My <span className="text-blue-600">Clients</span> Say!
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:px-24 max-md:px-4 md:py-16 max-md:py-8">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired, // image URL
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

Testimonial.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Testimonial;
