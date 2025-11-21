import React, { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import type { Course } from "../../components/ui/Card/CardCourseProfile";
import CardCourseProfile from "../../components/ui/Card/CardCourseProfile";
import Avatar from "../../../assets/images/default_avatar.jpg";

const coursesData: Course[] = [
    {
        id: 1,
        title: "Полный курс по React и Next.js",
        progress: 75,
        status: "В процессе",
        color: "bg-indigo-500",
    },
    {
        id: 2,
        title: "Основы дизайна с Figma",
        progress: 100,
        status: "Завершен",
        color: "bg-green-500",
    },
    {
        id: 3,
        title: "Введение в Python для анализа данных",
        progress: 20,
        status: "В процессе",
        color: "bg-yellow-500",
    },
];

export const Profile: React.FC = () => {
    const { user, loading, error, fetchUser } = useUserStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    if (error)
        return (
            <p className="text-center mt-20 text-lg text-red-600">{error}</p>
        );
    if (!user)
        return (
            <p className="text-center mt-20 text-lg">Пользователь не найден</p>
        );

    console.log(user);
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Заголовок страницы */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b-2 border-indigo-100 pb-3">
                    Мой Профиль
                </h1>

                {/* --- Секция "Данные пользователя" --- */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg
                            className="w-6 h-6 mr-2 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                        Данные пользователя
                    </h2>

                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                        {/* Аватар */}
                        <img
                            className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-500 ring-offset-2"
                            src={Avatar}
                            alt={user.first_name}
                        />

                        {/* Информация */}
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-3xl font-extrabold text-gray-900">
                                {user.first_name}
                            </p>
                            <p className="text-3xl font-extrabold text-gray-900">
                                {user.sur_name}
                            </p>
                            <p className="text-lg text-gray-600 mt-1">
                                {user.email}
                            </p>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold text-gray-700">
                                        Дата регистрации:
                                    </span>{" "}
                                    {user.created_at}
                                </p>
                            </div>
                        </div>

                        {/* Кнопка редактирования */}
                        <button className="py-2 px-4 text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition duration-150 border border-indigo-200">
                            Редактировать профиль
                        </button>
                    </div>
                </section>

                {/* --- Секция "Мои курсы" --- */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg
                            className="w-6 h-6 mr-2 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6.253v13m0-13C10.832 5.493 9.332 5 7.8 5c-1.563 0-3.13.483-4.172 1.488A5.993 5.993 0 003 12c0 1.574.48 3.139 1.448 4.159C5.876 17.58 8.169 18 10 18c.367 0 .73-.021 1.082-.061M12 6.253c1.168-.76 2.668-1.253 4.2-1.253 1.563 0 3.13.483 4.172 1.488A5.993 5.993 0 0121 12c0 1.574-.48 3.139-1.448 4.159C17.876 17.58 15.583 18 13.75 18"
                            ></path>
                        </svg>
                        Мои курсы
                    </h2>

                    {/* Сетка курсов */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coursesData.map((course) => (
                            <CardCourseProfile
                                key={course.id}
                                course={course}
                            />
                        ))}
                    </div>

                    {/* Кнопка "Посмотреть все" */}
                    <div className="mt-10 text-center">
                        <button className="py-3 px-8 text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-xl shadow-indigo-200">
                            Посмотреть все (3)
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};
