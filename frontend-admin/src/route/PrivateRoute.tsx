import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type PrivateRouteProps = RouteProps & {
  children: React.ReactElement;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
