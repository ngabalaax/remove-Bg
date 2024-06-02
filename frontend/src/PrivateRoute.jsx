import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  // const { isAuthenticated } = useAuth();
  const cookies = Cookies.get('token')
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />
};

export default PrivateRoute;
