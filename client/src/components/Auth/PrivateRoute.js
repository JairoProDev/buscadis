import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
