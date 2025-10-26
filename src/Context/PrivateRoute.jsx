import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./auth";
import { useContext } from "react";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
