import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollingText = () => {
  const [scrollOffset, setScrollOffset] = useState(-window.innerWidth / 3);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      setScrollOffset((prev) => prev - delta * 0.3);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="overflow-hidden whitespace-nowrap playfair-semibold relative w-full select-none">
      <motion.h1
        className="inline-block text-[6rem] md:text-[10rem] lg:text-[14rem]"
        animate={{ x: scrollOffset }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        Moin MN - Moin MN - Moin MN - Moin MN - Moin MN - Moin MN - Moin MN - Moin MN -
      </motion.h1>
    </div>
  );
};

export default ScrollingText;
