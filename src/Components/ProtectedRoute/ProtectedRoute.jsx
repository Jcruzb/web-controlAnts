/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '/src/contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <Outlet />
  );
}

export default ProtectedRoute;
