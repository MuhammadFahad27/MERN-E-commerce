import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../Loader';

function PrivateRoutes() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  return (isAuthenticated || user) && user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export default PrivateRoutes;
