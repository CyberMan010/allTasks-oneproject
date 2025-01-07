import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "./authUtils"

const AdminRoute = ({ children }) => {
  return isAuthed() ? children : <Navigate to="/login" />;
};

export default AdminRoute;
