
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const location = useLocation(); 

  if (!token || !user) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  } else {

    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;