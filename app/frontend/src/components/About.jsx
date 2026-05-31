import { motion } from 'framer-motion';
import ScrollingText from './ScrollingText';
import AboutImgSrc from "../assets/about.jpg";
import ActionButton from './ActionButton';
import PropTypes from 'prop-types';

const About = ({ aboutMe }) => {
  return (
    <>
      <div>
        {/* Scrolling name animation */}
        <ScrollingText />

        <section className='scroll-mt-4 md:scroll-mt-8 md:mx-24 max-md:mx-4' id='about'>
          {/* Heading Animation */}
          <motion.h3
            className="montserrat-alternates-semibold my-4 text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }} F
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600">
              About{" "}
            </span>
            Me
          </motion.h3>

          <div className="grid grid-cols-4 gap-12 md:py-12 max-md:py-6 justify-center items-start">
            {/* Image Animation */}
            <motion.div
              className="col-span-4 justify-self-center lg:col-span-1 max-w-80 shadow-[0_0_30px_12px_rgba(37,99,235,0.4)] md:shadow-[0_0_60px_16px_rgba(37,99,235,0.7)] rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                className="rounded-lg"
                alt="About Image"
                src={AboutImgSrc}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </motion.div>

            {/* About Content Animation */}
            <div className="col-span-4 lg:col-span-3 flex flex-col max-lg:items-center">
              {/* Staggered Content */}
              <motion.div
                className="rich-text-content flex flex-col gap-3 text-base md:text-lg lg:text-xl text-gray-300 text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.3 },
                  },
                }}
              >
                {aboutMe.split("</p>").map((para, index) => (
                  <motion.p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: para }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ))}
              </motion.div>

              {/* Action Button Animation (Spring Effect) */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 30, damping: 10 }}
              >
                <span onClick={() => document.getElementById('contact').scrollIntoView()}>
                  <ActionButton button="Let's Work Together" />
                </span>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
};

About.propTypes = {
  aboutMe: PropTypes.string.isRequired,
};

export default About;
