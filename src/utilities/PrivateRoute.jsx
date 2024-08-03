import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" state={{showMessage:true}} replace />;
};

export default PrivateRoute;