import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Users, Clock, BookOpen, Play } from "lucide-react";
import { useCoursesStore } from "../../store/coursesStore";

const CoursePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const course = useCoursesStore((s) => s.courseDetail);
    const fetchCourseById = useCoursesStore((s) => s.fetchCourseById);
    const [activeLesson, setActiveLesson] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) fetchCourseById(id);
    }, [id, fetchCourseById]);

    if (!course)
        return <p className="text-center mt-20 text-lg">Загрузка курса...</p>;

    const handleLessonClick = (lessonId: string) => {
        setActiveLesson(lessonId);
    };

    console.log(course);
    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Кнопка Назад */}
            <div className="mb-6">
                <Link
                    to={`/home/category/${course.categories?.id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
                >
                    <ArrowLeft size={18} className="mr-2" /> Вернуться к
                    категории
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Основной контент */}
                <div className="flex-1">
                    {/* Заголовок и описание */}
                    <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
                    <p className="text-gray-600 mb-6">
                        {course.full_description}
                    </p>

                    {/* Статистика */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-500" size={18} />
                            <span>{course.avg_rating} / 5</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={18} />
                            <span>{course.review_count} студентов</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>{course.difficulty_level}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} />
                            <span>{course.modules.length} модулей</span>
                        </div>
                    </div>

                    {/* Модули и уроки */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Программа курса
                        </h2>
                        {course.modules.map((mod) => (
                            <div key={mod.id} className="mb-6 border-b pb-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {mod.position}. {mod.title}
                                </h3>
                                {mod.description && (
                                    <p className="text-gray-600 mb-2">
                                        {mod.description}
                                    </p>
                                )}
                                <ul className="space-y-2">
                                    {mod.lessons.map((lesson) => (
                                        <li
                                            key={lesson.id}
                                            className={`flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 transition ${
                                                activeLesson === lesson.id
                                                    ? "bg-gray-100 font-semibold"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleLessonClick(lesson.id)
                                            }
                                        >
                                            <Play
                                                size={16}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                {lesson.position}.{" "}
                                                {lesson.title}
                                            </span>
                                            <span>{lesson.content}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Боковая панель */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="sticky top-8 bg-white rounded-2xl shadow-md overflow-hidden border">
                        <img
                            src={
                                course.image || "https://picsum.photos/400/200"
                            }
                            alt={course.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                            <p className="text-3xl font-bold mb-2">
                                {course.price
                                    ? `${course.price} ₸`
                                    : "Бесплатно"}
                            </p>
                            <button
                                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition mb-4"
                                onClick={() => {
                                    navigate(`/course/${id}/enroll`);
                                }}
                            >
                                Начать обучение
                            </button>

                            <div className="border-t mt-5 pt-4 text-sm text-gray-600">
                                <p>⏰ Гибкий график</p>
                                <p>💻 Доступ на всех устройствах</p>
                                <p>🎓 Сертификат после завершения</p>
                            </div>

                            {course.categories && (
                                <div className="mt-4 text-sm text-gray-500">
                                    Категория: {course.categories.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
