import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Tab = () => {
  const location = useLocation();

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
  ]

  return (
    <Nav
      justify
      variant="underline"
      activeKey={location.pathname}
      className='max-md:hidden bg-light-2 transition-all duration-300 ease-in-out flex items-end text-sm sm:text-base lg:text-lg'
    >
      {TabList.map(tab => (
        <Nav.Item key={tab.name}>
          <Nav.Link
            as={Link}
            to={tab.path}
            eventKey={tab.path}
            className={`
                transition-all duration-300 ease-in-out
                hover:font-semibold
                hover:text-light-text
                ${location.pathname === tab.path
                ? '!text-light-primary'
                : 'text-light-text'
              }
              `}
          >
            {tab.name}
          </Nav.Link>
        </Nav.Item>
      ))
      }
    </Nav>
  );
};

export default Tab;
