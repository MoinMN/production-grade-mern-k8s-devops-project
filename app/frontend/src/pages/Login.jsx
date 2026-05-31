import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Alert from '../components/Alert';
import { AuthUser } from '../api/auth.api';
import BASE_URL from '../config/BackendURL';
import Loading from '../components/admin/Loading';
import BackgroundVideo from '../assets/bg-admin.mp4';
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // alert 
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  useEffect(() => {
    AuthUser()
      .then(res => {
        if (res.isAuthenticated) return navigate('/admin/dashboard');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    try {
      // const formData = new FormData(e.target);
      const username = new FormData(e.target).get('username');
      const password = new FormData(e.target).get('password');

      if (!username || !password) {
        setMessageAlert('All Fields Required!');
        setVariantAlert('danger');
        setShowAlert(true);
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      )

      if (response.status === 200) {
        setMessageAlert(response.data.message);
        setVariantAlert('success');
        const params = new URLSearchParams(location.search);
        const redirectPath = params.get('redirect');

        if (redirectPath) {
          navigate(redirectPath);
        } else {
          navigate('/admin/dashboard');
        }
      }
    } catch (error) {
      console.log(`Error while login\nError => `, error);
      setMessageAlert(error.response.data.message);
      setVariantAlert('danger');
    } finally {
      setShowAlert(true);
      setIsLoginLoading(false);
    }
  }

  return (
    <>
      <Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />

      <Helmet>
        <title>Admin Dashboard | Moin Naik</title>
        <meta
          name="description"
          content="Admin control panel to manage portfolio content, skills, projects, and testimonials."
        />
      </Helmet>

      {isLoading
        ? <Loading />
        : <>
          <div className={`min-h-screen flex justify-center items-center courier text-base text-black`}>
            {/* video  */}
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 top-0 left-0 w-full h-full object-cover"
            >
              <source src={BackgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="w-2/3 flex justify-center items-center max-lg:w-11/12 max-md:text-sm">
              <Form onSubmit={handleSubmit} className={`w-4/5 px-2 py-6 rounded-md backdrop-blur-sm border-2 bg-white/25 shadow-md max-md:w-full`}>
                <div className="mb-10 text-center">
                  <h3 className='text-white text-3xl max-md:text-2xl'>
                    Only Moin MN can login!
                  </h3>
                </div>
                <div className="grid gap-2 w-1/2 m-auto max-md:w-4/5">
                  <div className={`border-2 border-light-primary rounded-lg`}>
                    <FloatingLabel controlId="floatingUsername" label="Username">
                      <Form.Control
                        className="focus:ring-0"
                        type="text"
                        placeholder="Username"
                        autoComplete='username'
                        name='username'
                      />
                    </FloatingLabel>
                  </div>
                  <InputGroup className='border-2 border-light-primary rounded-lg'>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control
                        className="focus:ring-0"
                        type={isEyeOpen ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="password"
                        name='password'
                      />
                    </FloatingLabel>
                    <InputGroup.Text
                      className='cursor-pointer'
                      onClick={(e) => {
                        setIsEyeOpen(!isEyeOpen);
                        e.currentTarget.querySelector('span i').classList.toggle('fa-eye');
                        e.currentTarget.querySelector('span i').classList.toggle('fa-eye-slash');
                      }}
                    >
                      <span className='flex justify-center items-center max-sm:text-sm'>
                        <i className="fa-solid fa-eye" />
                      </span>
                    </InputGroup.Text>
                  </InputGroup>
                  <Button
                    className="transition-transform transform duration-300"
                    variant="primary"
                    type="submit"
                    disabled={isLoginLoading === true}
                  >
                    {isLoginLoading === true && (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      />
                    )}
                    Log In
                  </Button>
                </div>
                <div className='flex flex-col justify-center items-center mt-6'>
                  <span className='text-slate-300'>
                    Admin Dashboard
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Login
