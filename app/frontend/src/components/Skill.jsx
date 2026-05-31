import { motion } from "framer-motion";
import SkillBox from "./SkillBox";
import PropTypes from "prop-types";

const Skill = ({ skills }) => {
  return (
    <section className="md:py-8 max-md:py-6 w-full" id="skill">
      {/* skills overlay in background  */}
      <h3 className='text-[8rem] md:text-[20rem] lg:text-[24rem] font-bold min-h-[75vh] md:min-h-[85vh] absolute flex flex-col justify-center items-center w-full opacity-5 md:opacity-15 overflow-hidden uppercase'>
        skills
      </h3>
      {/* Title */}
      <motion.h3
        className="montserrat-alternates-semibold my-6 text-3xl md:text-4xl lg:text-5xl md:mx-24 max-md:mx-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        My <span className="text-blue-600">Skills</span>
      </motion.h3>

      <div className="py-14">
        {/* Row 1 - Moves Left to Right */}
        <SkillRow skills={skills} direction="right" />

        {/* Row 2 - Moves Right to Left */}
        <SkillRow skills={skills} direction="left" />
      </div>
    </section>
  );
};

// Skill Row Component with Hover Interaction
const SkillRow = ({ skills, direction }) => {
  return (
    <div className="relative w-full overflow-hidden flex py-8">
      <motion.div
        className="flex space-x-4 md:space-x-8"
        variants={{
          animate: {
            x: direction === "left" ? ["0%", "-35%", "0%"] : ["-35%", "0%", "-35%"],
            transition: { repeat: Infinity, duration: 20, ease: "linear" },
          },
        }}
        animate="animate"
        viewport={{ once: true, amount: 0.5 }}
      >
        {[...skills, ...skills]?.map((skill, index) => (
          <SkillBox key={index} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

// PropTypes validation
Skill.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string, // optional, e.g., for SkillBox
    })
  ).isRequired,
};

// Inner SkillRow PropTypes
SkillRow.propTypes = {
  skills: PropTypes.array.isRequired,
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
};

export default Skill;
