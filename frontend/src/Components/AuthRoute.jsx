
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  
  if (isLoggedIn) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === "user") {
      return <Navigate to="/" replace />;
    }
  }

  
  return <Outlet />;
}

export default AuthRoute;