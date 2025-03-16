import { Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  return auth?.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
