// src/routes/PublicRoute.tsx
import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../src/store/authStore';
import { getToken } from "../src/utils/auth.ts";

interface PublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = getToken();

    if (token) {
        return <Navigate to="/home" replace />;
    }

    return children;
};
