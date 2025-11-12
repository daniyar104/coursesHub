import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockCourses, categories } from "../../../data/courses";

import { Star, Clock, Users, BookOpen, ArrowLeft } from "lucide-react";

const CoursePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const course = mockCourses.find((c) => c.id.toString() === id);

    if (!course) return <p className="p-8 text-gray-500">Курс не найден</p>;

    const category = categories.find((cat) => cat.slug === course.category);


    return (
        <div className="p-8 max-w-6xl mx-auto">

            {/* Кнопка Назад */}
            <div className="mb-6">
                <Link
                    to={`/home/category/${category?.slug}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
                >
                    <ArrowLeft size={18} className="mr-2" /> Вернуться к категории
                </Link>
            </div>

            {/* Основная часть */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Основной контент */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {course.description}
                    </p>

                    {/* Краткая статистика */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-500" size={18} />
                            <span>{course.rating} / 5.0</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={18} />
                            <span>{course.students} студентов</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} />
                            <span>{course.lessons} уроков</span>
                        </div>
                    </div>

                    {/* Преподаватель */}
                    <div className="bg-gray-100 p-6 rounded-2xl mb-10">
                        <h2 className="text-xl font-semibold mb-3">Преподаватель</h2>
                        <div className="flex items-center gap-4">
                            <img
                                src={course.authorImage}
                                alt={course.author}
                                className="w-16 h-16 rounded-full object-cover border"
                            />
                            <div>
                                <p className="font-semibold text-lg">{course.author}</p>
                                <p className="text-gray-500 text-sm">Опытный специалист</p>
                            </div>
                        </div>
                    </div>

                    {/* О курсе */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">О курсе</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Этот курс поможет вам освоить ключевые навыки и инструменты,
                            необходимые для успешной карьеры в данной области. Вы получите
                            практические знания, научитесь создавать реальные проекты и
                            разберётесь в основных принципах, применимых на практике.
                        </p>
                    </div>

                    {/* Программа курса */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Что вы изучите</h2>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                            <li>Базовые и продвинутые концепции по теме курса</li>
                            <li>Работу с инструментами и фреймворками</li>
                            <li>Реализацию проектов с нуля</li>
                            <li>Лучшие практики и советы от экспертов</li>
                        </ul>
                    </div>
                </div>

                {/* Боковая панель */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="sticky top-8 bg-white rounded-2xl shadow-md overflow-hidden border">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                            <p className="text-3xl font-bold mb-2">
                                {course.price > 0 ? `${course.price} ₸` : "Бесплатно"}
                            </p>

                            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                                Начать обучение
                            </button>

                            <div className="border-t mt-5 pt-4 text-sm text-gray-600">
                                <p>⏰ Гибкий график</p>
                                <p>💻 Доступ на всех устройствах</p>
                                <p>🎓 Сертификат после завершения</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
