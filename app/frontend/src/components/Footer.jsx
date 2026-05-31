const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-500 md:text-gray-400 py-6 px-4 text-center relative">
      <p className="">&copy; {new Date().getFullYear()} All rights reserved.</p>

      <div className="flex flex-col md:flex-row justify-between">
        {/* Developed & Maintained By */}
        <span className="mt-2 relative inline-block">
          Developed & Maintained <span className="hover:text-blue-500 font-semibold underline decoration-wavy decoration-blue-600 transition-all duration-300 cursor-pointer">Moin MN</span>
        </span>

        {/* Version Information */}
        <span
          className="mt-2 transition-all duration-300 cursor-pointer relative inline-block"
        >
          Version: 26.2.13
        </span>
      </div>
    </footer>
  );
};

export default Footer;
