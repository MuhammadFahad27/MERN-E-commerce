import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function UserRoute() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const location = useLocation();

  // If user is authenticated
  if (isLoggedIn || user?.id) {
    return <Outlet />;
  }

  // Save the attempted location for redirect after sign in
  return <Navigate to="/sign-in" state={{ from: location }} replace />;
}

export default UserRoute;
