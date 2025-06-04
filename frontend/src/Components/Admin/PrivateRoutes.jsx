import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {

    const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  if (loading) return <Loader />;
  return isAuthenticated && user?.role === "admin" ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoutes
