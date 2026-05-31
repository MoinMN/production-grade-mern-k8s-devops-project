import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
import { AuthUser } from '../../api/auth.api';
import Loading from '../Loading';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await AuthUser();
        if (res.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);

          if (location.pathname.includes('/admin')) {
            const redirectPath = encodeURIComponent(location.pathname + location.search);
            navigate(`/admin?redirect=${redirectPath}`);
          }
        }
      } catch {
        setIsAuthenticated(false);
        if (location.pathname.includes('/admin')) {
          const redirectPath = encodeURIComponent(location.pathname + location.search);
          navigate(`/admin?redirect=${redirectPath}`);
        }
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />
  }

  if (isAuthenticated === false && !location.pathname.includes('/admin')) {
    return <PageNotFound />;
  }

  return <Outlet />;
}

export default ProtectedRoute
