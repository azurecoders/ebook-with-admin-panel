import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.q3Mk39yttK ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/"></Navigate>
  );
};

export default PrivateRoute;
