// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import LoginPage from "../src/pages/auth/LoginPage";
import WelcomePage from "../src/pages/welcomePage/WelcomePage";
import RegisterPage from "../src/pages/auth/RegisterPage.tsx";
import {PrivateRoute} from "./PrivateRoutes.tsx";
import HomePage from "../src/pages/main/HomePage.tsx";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Публичные роуты */}
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/welcome" element={<PublicRoute><WelcomePage /></PublicRoute>} />

            {/* Приватные роуты */}
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />

            {/* Редирект по умолчанию */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
    );
};
