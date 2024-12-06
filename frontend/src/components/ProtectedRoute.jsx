import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { fetchUser } from '@/store/slices/userSlice';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  
  if (loading) {
    return <Spinner/>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;