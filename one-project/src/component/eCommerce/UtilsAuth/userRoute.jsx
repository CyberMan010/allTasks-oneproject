import React from "react";
import { isAuthenticated } from "./authUtils";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
}
export default UserRoute;