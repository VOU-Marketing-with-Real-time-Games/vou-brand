import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import path from "../../constants/paths";

function PrivateRoute() {
  const { auth } = React.useContext(AuthContext)!;
  const accessToken = localStorage.getItem("accessToken");

  if (!auth || !accessToken) {
    return <Navigate to={path.LOGIN} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;