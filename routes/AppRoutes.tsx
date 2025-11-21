// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import LoginPage from "../src/pages/auth/LoginPage";
import WelcomePage from "../src/pages/welcomePage/WelcomePage";
import RegisterPage from "../src/pages/auth/RegisterPage.tsx";
import { PrivateRoute } from "./PrivateRoutes.tsx";
import HomePage from "../src/pages/main/HomePage/HomePage.tsx";
import CategoryPage from "../src/pages/main/categories/CategoryPage.tsx";
import CoursePage from "../src/pages/main/CoursePage.tsx";
import { Profile } from "../src/pages/profile/Profile.tsx";
import Enrollments from "../src/pages/enrollments/Enrollments.tsx";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Публичные роуты */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/welcome"
                element={
                    <PublicRoute>
                        <WelcomePage />
                    </PublicRoute>
                }
            />

            {/* Приватные роуты */}
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/home/category/:slug"
                element={
                    <PrivateRoute>
                        <CategoryPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/course/:id"
                element={
                    <PrivateRoute>
                        <CoursePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/course/:id/enroll"
                element={
                    <PrivateRoute>
                        <Enrollments />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />

            {/* Редирект по умолчанию */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
    );
};
