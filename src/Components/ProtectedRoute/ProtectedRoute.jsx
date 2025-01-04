/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '../../Contexts/AuthContext';

import { TotalBar } from "../TotalBar/TotalBar";
import { FamilyContextProvider } from "../../Contexts/FamlilyContext";

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <TotalBar>
      <FamilyContextProvider>
      <Outlet />
      </FamilyContextProvider>
    </TotalBar>
  );
}

export default ProtectedRoute;
