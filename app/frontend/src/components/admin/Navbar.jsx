import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../../api/auth.api';
import Alert from '../Alert';

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // alert 
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const TabList = [
    {
      path: "/admin/dashboard",
      name: "Hero & About Me"
    },
    {
      path: "/admin/service",
      name: "Services"
    },
    {
      path: "/admin/skill",
      name: "Skills"
    },
    {
      path: "/admin/project",
      name: "Projects"
    },
    {
      path: "/admin/testimonials",
      name: "Client Testimonials"
    },
    {
      path: "/admin/contact",
      name: "Contact"
    },
  ];

  // logout api
  const handleLogout = () => {
    const response = Logout();
    response
      .then(res => {
        setMessageAlert(res.data.message || "Logout Successfully!");
        if (res.status == 200) {
          setVariantAlert("success");
          navigate('../admin');
        } else
          setVariantAlert("danger");
      })
      .catch(err => {
        setMessageAlert(err.data.message || "Internal Server Error");
        setVariantAlert("danger");
      })
      .finally(() => {
        setShowAlert(true);
      });
  }

  return (
    <>
      <nav className='sticky bg-light-1 text-black backdrop-blur-xl w-full p-4 transition-colors duration-300 ease-in-out shadow-md top-0 left-0 z-20 max-sm:p-2'>
        <div className="mx-auto flex justify-between items-center gap-2">
          {/* Brand */}
          <Link
            to='#'
            className='flex items-center text-4xl text-light-primary tracking-[0.3rem] max-sm:text-xl max-sm:tracking-[0.2rem]'
          >
            <div className="mx-2 montserrat-alternates-bold uppercase">
              moin mn
              <span className="text-black">.</span>
            </div>
          </Link>

          <div className="flex justify-center items-center gap-x-6 max-sm:gap-x-3">
            {/* Logout Button  */}
            <div className="cursor-pointer text-red-500" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket text-2xl focus:outline-none max-sm:text-xl" />
            </div>

            {/* GOTO website */}
            <div className="hidden md:flex items-center">
              <Link to='/' target='_blank'>
                <i className="fa-solid fa-up-right-from-square text-2xl focus:outline-none max-sm:text-xl" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button (Visible only on small screens) */}
            <button
              className="relative w-8 h-6 flex flex-col justify-between items-center md:hidden focus:outline-none max-sm:w-6 max-sm:h-4"
              onClick={toggleNavbar}
            >
              <div className={`hamburger-line transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-3 max-sm:translate-y-1' : ''}`} />
              <div className={`hamburger-line transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`hamburger-line transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-3' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navbar Links with animation (Hidden by default on small screens) */}
        <div className={`${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-200 ease-in-out bg-light-1 mt-2 md:hidden`}>
          <ul className="flex flex-col items-center justify-center space-y-2 p-2 text-sm md:text-base md:space-x-4 md:p-4">
            {TabList.map(tab => (
              <li key={tab.name}>
                <Link
                  to={tab.path}
                  className={`block py-2 px-4 text-center hover:bg-light-2 rounded-lg transition duration-300 ease-in-out ${location.pathname === tab.path && 'bg-light-2'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tab.name}
                </Link>
              </li>
            ))
            }
          </ul>
        </div>
      </nav>

      {/* alert  */}
      <Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
}

export default AdminNavbar;
