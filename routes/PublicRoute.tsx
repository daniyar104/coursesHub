// src/routes/PublicRoute.tsx
import React, {type JSX} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAuthStore();

    if (user) {
        return <Navigate to="/welcome" replace />;
    }

    return children;
};
