// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import LoginPage from "../src/pages/auth/LoginPage";
import WelcomePage from "../src/pages/welcomePage/WelcomePage";
import RegisterPage from "../src/pages/auth/RegisterPage.tsx";
import { PrivateRoute } from "./PrivateRoutes.tsx";
import HomePage from "../src/pages/main/HomePage/HomePage.tsx";
import CategoriesListPage from "../src/pages/main/categories/CategoriesListPage.tsx";
import CategoryPage from "../src/pages/main/categories/CategoryPage.tsx";
import CoursePage from "../src/pages/main/CoursePage.tsx";
import { Profile } from "../src/pages/profile/Profile.tsx";
import Enrollments from "../src/pages/enrollments/Enrollments.tsx";
import LessonPage from "../src/pages/lesson article/LessonPage.tsx";
import LessonArticle from "../src/pages/lesson article/LessonArticle.tsx";
import TeachersListPage from "../src/pages/teachers/TeachersListPage.tsx";
import TeacherDetailPage from "../src/pages/teachers/TeacherDetailPage.tsx";
import MyCoursesPage from "../src/pages/my-courses/MyCoursesPage.tsx";
import LessonMaterialPage from "../src/pages/lesson/LessonMaterialPage.tsx";
import CourseCurriculumPage from "../src/pages/course/CourseCurriculumPage.tsx";

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
                path="/categories"
                element={
                    <PrivateRoute>
                        <CategoriesListPage />
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

            <Route
                path="/course/:courseId/lesson/:lessonId"
                element={
                    <PrivateRoute>
                        <LessonPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/teachers"
                element={
                    <PrivateRoute>
                        <TeachersListPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/teachers/:id"
                element={
                    <PrivateRoute>
                        <TeacherDetailPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/my-courses"
                element={
                    <PrivateRoute>
                        <MyCoursesPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/lesson/:id/material"
                element={
                    <PrivateRoute>
                        <LessonMaterialPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/course/:id/curriculum"
                element={
                    <PrivateRoute>
                        <CourseCurriculumPage />
                    </PrivateRoute>
                }
            />

            {/* Редирект по умолчанию */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
    );
};
