import { useEffect, useState } from 'react'
import Model from '../components/ModelThreeD'
import { TypeAnimation } from 'react-type-animation';
import ActionButton from './ActionButton';
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const Hero = ({ iam = [] }) => {
  const [sequence, setSequence] = useState(["", 1000]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (iam.length > 0) {
      setSequence((prev) => [...prev, ...iam.flatMap((i) => [i, 2000])]);
      setIsLoading(false);
    }
  }, [iam]);

  return (
    <>
      <motion.section
        id='home'
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 min-h-[86vh] scroll-mt-12 select-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('../assets/bg-line-dot.png')] bg-cover bg-center opacity-65 md:opacity-85" />

        <motion.div
          className="col-span-2 flex flex-col justify-center items-start gap-10 z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4 md:self-center lg:w-full overflow-hidden md:px-4 max-md:px-1">
            {/* hero text */}
            <motion.div
              className="flex flex-col justify-center text-left ml-7 lg:ml-28"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* arrow */}
              <motion.i
                className="fa-solid fa-arrow-trend-down text-xl md:text-2xl lg:text-3xl my-2 -mx-6 md:-mx-8"
                animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
              <span className='text-2xl md:text-3xl lg:text-4xl montserrat'>{`Hello, I'm`}</span>
              <div className='text-5xl md:text-6xl lg:text-7xl montserrat-alternates-semibold flex gap-2 flex-wrap'>
                <motion.h1
                  className='text-blue-600'
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                >
                  Moin
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
                >
                  Naik!
                </motion.h1>
              </div>
            </motion.div>

            {/* typing animation */}
            <motion.div
              className="text-white text-left ml-7 lg:ml-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {isLoading
                ? <>
                  {/* loading animation  */}
                  <div className="text-base md:text-lg lg:text-xl flex items-center space-x-1">
                    <span>Loading</span>
                    <motion.span
                      className="dot-animation"
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >.</motion.span>
                    <motion.span
                      className="dot-animation"
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
                    >.</motion.span>
                    <motion.span
                      className="dot-animation"
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
                    >.</motion.span>
                  </div>
                </>
                : <TypeAnimation
                  sequence={sequence}
                  wrapper="span"
                  speed={50}
                  style={{ display: 'inline-block' }}
                  repeat={Infinity}
                  className='text-2xl md:text-3xl lg:text-4xl courier'
                />
              }
            </motion.div>
          </div>

          {/* Location box */}
          <motion.div
            className="bg-slate-600/50 text-white md:py-3 max-md:py-2 md:px-8 max-md:px-4 text-sm md:text-base lg:text-lg text-wrap w-44 md:w-64 rounded-r-full flex items-center gap-2 md:gap-3 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Located in Mumbai, India
            <motion.span
              className='bg-gray-500/80 md:px-3 md:py-2 max-md:px-2 max-md:py-1 rounded-full'
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <i className="fa-solid fa-earth-asia text-xl md:text-2xl lg:text-3xl" />
            </motion.span>
          </motion.div>

          {/* request service btn */}
          <motion.div
            className="md:ml-28 max-lg:self-center px-4 py-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span onClick={() => document.getElementById('contact').scrollIntoView()}>
              <ActionButton button="Request Service" />
            </span>
          </motion.div>
        </motion.div>

        {/* model */}
        <div className="col-span-3 flex justify-center items-center z-10">
          <Model />
        </div>
      </motion.section>
    </>
  )
}

Hero.propTypes = {
  iam: PropTypes.arrayOf(PropTypes.string), // expects an array of strings for the typing animation
};

export default Hero
