// src/routes/PrivateRoute.tsx
import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../src/store/authStore";
import { getToken, isTokenValid } from "../src/utils/auth.ts";

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
