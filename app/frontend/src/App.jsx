import './styles/index.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// admin imports
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminNavbar from './components/admin/Navbar';
import AdminFooter from './components/admin/Footer';
import Tab from './components/admin/Tab';
import ClientTestimonial from './pages/admin/ClientTestimonial';
import PostTestimonial from './pages/PostTestimonial';
import Dashboard from "./pages/admin/Dashboard";
import Service from './pages/admin/Service';
import Project from './pages/admin/Project';
import Contact from './pages/admin/Contact';
import Skill from './pages/admin/Skill';
import Login from './pages/Login';

// Main Page
import MainPage from './pages/MainPage';

// Page Not Found
import PageNotFound from './components/PageNotFound';

const AdminLayout = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <AdminNavbar />
        <Tab />
        <div className='flex-grow bg-light-1 text-black'>
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/admin' element={<Login />} />

          <Route path='/admin' element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='service' element={<Service />} />
              <Route path='skill' element={<Skill />} />
              <Route path='project' element={<Project />} />
              <Route path='testimonials' element={<ClientTestimonial />} />
              <Route path='contact' element={<Contact />} />
            </Route>
          </Route>

          {/* post a testimonial by client  */}
          <Route path='/post-testimonial' element={<PostTestimonial />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
