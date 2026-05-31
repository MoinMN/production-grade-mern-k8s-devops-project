import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HoverText from './HoverText';
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';

const Navbar = ({ activeSection = "" }) => {
  const navList = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "project" },
    { name: "Skills", id: "skill" },
    { name: "Services", id: "service" },
    // { name: "Testimonials", id: "testimonial" },
    { name: "Contact", id: "contact" },
  ];

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Auto-close mobile nav when screen size is lg (1024px and above)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsNavbarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => setIsNavbarOpen((prev) => !prev);

  const handleScrollSection = (section) => {
    const scrollSection = document.getElementById(section);
    if (scrollSection) {
      scrollSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsNavbarOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="backdrop-blur-lg shadow-md w-full sticky top-0 z-50">
        <motion.div
          className="flex justify-between items-center py-4 px-6 md:px-12 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <Link to='/'>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="montserrat-alternates-semibold text-3xl md:text-4xl lg:text-5xl selection:bg-blue-300 cursor-pointer"
            >
              Moin MN<span className="font-bold text-blue-600">.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="text-xl hidden lg:flex">
            <ul className="flex gap-6">
              {navList.map((nav, index) => (
                <motion.li
                  key={index}
                  onClick={() => handleScrollSection(nav.id)}
                  className={`relative cursor-pointer ${activeSection === nav.id ? "text-blue-500 montserrat-alternates-bold" : "montserrat-alternates-semibold"} hover:text-blue-600 transition-all duration-300 ease-in-out`}
                  whileHover={{ scale: 1.1 }}
                >
                  <HoverText button={nav.name} />

                  {/* Bottom Dot Indicator */}
                  <AnimatePresence mode="wait">
                    {activeSection === nav.id && (
                      <motion.div
                        className="absolute left-1/2 -bottom-2 w-2 h-2 bg-blue-600 rounded-full"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <span
            className="lg:hidden flex flex-col gap-2 cursor-pointer w-10 h-full z-50"
            onClick={handleClick}
          >
            <span
              className={`border-2 w-8 transition-all duration-300 ${isNavbarOpen ? 'rotate-[45deg] translate-y-[6px]' : ''}`}
            />
            <span
              className={`border-2 w-8 transition-all duration-300 ${isNavbarOpen ? '-rotate-[45deg] -translate-y-[6px]' : ''}`}
            />
          </span>
        </motion.div>
      </nav>

      {/* Mobile Menu (Appears Below the Navbar) */}
      <AnimatePresence>
        {isNavbarOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-[4.5rem] backdrop-blur-lg left-0 w-full shadow-lg py-6 flex flex-col items-center z-30"
          >
            <ul className="text-base">
              {navList.map((nav, index) => (
                <motion.li
                  key={index}
                  onClick={() => handleScrollSection(nav.id)}
                  whileHover={{ scale: 1.1 }}
                  className={`flex flex-col items-center cursor-pointer montserrat-alternates-semibold hover:text-blue-600 transition-all duration-300 ease-in-out`}
                >
                  <HoverText button={nav.name} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Navbar.propTypes = {
  activeSection: PropTypes.string, // Currently optional, defaults to ""
};

export default Navbar;
