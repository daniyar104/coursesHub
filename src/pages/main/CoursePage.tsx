import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Star,
    Users,
    Clock,
    BookOpen,
    Play,
    CheckCircle,
    Award,
    Calendar,
    TrendingUp,
    Sparkles,
} from "lucide-react";
import { useCoursesStore } from "../../store/coursesStore";

const CoursePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const course = useCoursesStore((s) => s.courseDetail);
    const fetchCourseById = useCoursesStore((s) => s.fetchCourseById);
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) fetchCourseById(id);
    }, [id, fetchCourseById]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl text-gray-600">Загрузка курса...</p>
                </div>
            </div>
        );
    }

    const totalLessons = course.modules.reduce(
        (acc, mod) => acc + mod.lessons.length,
        0
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Link
                        to={`/home/category/${course.category_id}`}
                        className="inline-flex items-center text-white/90 hover:text-white mb-6 transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Вернуться к категории
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-6 h-6" />
                                <span className="text-indigo-200 text-sm font-semibold uppercase tracking-wide">
                                    {course.difficulty_level}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {course.title}
                            </h1>
                            <p className="text-xl text-indigo-100 mb-6">
                                {course.short_description}
                            </p>

                            {/* Stats Row */}
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Star className="w-5 h-5 text-yellow-300" />
                                    <span className="font-semibold">
                                        {Number(course.avg_rating).toFixed(1)} / 5.0
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Users className="w-5 h-5" />
                                    <span className="font-semibold">
                                        {course.review_count} студентов
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <BookOpen className="w-5 h-5" />
                                    <span className="font-semibold">
                                        {course.modules.length} модулей
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Play className="w-5 h-5" />
                                    <span className="font-semibold">
                                        {totalLessons} уроков
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="text-center mb-4">
                                    <div className="text-4xl font-bold mb-2">
                                        {course.price ? `${course.price} ₸` : "Бесплатно"}
                                    </div>
                                    <p className="text-indigo-100 text-sm">
                                        Полный доступ к курсу
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate(`/course/${id}/enroll`)}
                                    className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg mb-4"
                                >
                                    Начать обучение
                                </button>
                                <div className="space-y-2 text-sm text-indigo-100">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Гибкий график обучения</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Доступ на всех устройствах</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-4 h-4" />
                                        <span>Сертификат по завершении</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Course Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <BookOpen className="w-8 h-8 text-indigo-600" />
                                О курсе
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {course.full_description || course.short_description}
                            </p>
                        </motion.div>

                        {/* Course Curriculum */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <TrendingUp className="w-8 h-8 text-indigo-600" />
                                Программа курса
                            </h2>

                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="space-y-4"
                            >
                                {course.modules.map((mod, modIndex) => (
                                    <motion.div
                                        key={mod.id}
                                        variants={item}
                                        className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors"
                                    >
                                        <button
                                            onClick={() =>
                                                setActiveModule(
                                                    activeModule === mod.id ? null : mod.id
                                                )
                                            }
                                            className="w-full text-left p-6 bg-gradient-to-r from-gray-50 to-white hover:from-indigo-50 hover:to-purple-50 transition-all"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full text-sm font-bold">
                                                            {modIndex + 1}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-gray-800">
                                                            {mod.title}
                                                        </h3>
                                                    </div>
                                                    {mod.description && (
                                                        <p className="text-gray-600 ml-11">
                                                            {mod.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Play className="w-4 h-4" />
                                                        {mod.lessons.length} уроков
                                                    </span>
                                                    <motion.div
                                                        animate={{
                                                            rotate:
                                                                activeModule === mod.id ? 180 : 0,
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        ▼
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Lessons List */}
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: activeModule === mod.id ? "auto" : 0,
                                                opacity: activeModule === mod.id ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 space-y-2 bg-gray-50">
                                                {mod.lessons.map((lesson, lessonIndex) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer group"
                                                    >
                                                        <div className="flex items-center justify-center w-6 h-6 bg-gray-200 group-hover:bg-indigo-600 text-gray-600 group-hover:text-white rounded-full text-xs font-bold transition-colors">
                                                            {lessonIndex + 1}
                                                        </div>
                                                        <Play className="w-4 h-4 text-indigo-600" />
                                                        <span className="flex-1 text-gray-700 group-hover:text-indigo-700 font-medium">
                                                            {lesson.title}
                                                        </span>
                                                        {lesson.content && (
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                Материал
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Course Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Информация о курсе
                            </h3>
                            <div className="space-y-4">
                                {course.categories && (
                                    <div className="flex items-start gap-3">
                                        <BookOpen className="w-5 h-5 text-indigo-600 mt-0.5" />
                                        <div>
                                            <div className="text-sm text-gray-500">Категория</div>
                                            <div className="font-semibold text-gray-800">
                                                {course.categories.name}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                                    <div>
                                        <div className="text-sm text-gray-500">Уровень</div>
                                        <div className="font-semibold text-gray-800">
                                            {course.difficulty_level}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                                    <div>
                                        <div className="text-sm text-gray-500">Создан</div>
                                        <div className="font-semibold text-gray-800">
                                            {new Date(course.created_at).toLocaleDateString("ru-RU")}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="w-5 h-5 text-indigo-600 mt-0.5" />
                                    <div>
                                        <div className="text-sm text-gray-500">Последнее обновление</div>
                                        <div className="font-semibold text-gray-800">
                                            {new Date(course.updated_at).toLocaleDateString("ru-RU")}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-indigo-600" />
                                        <span className="font-semibold text-gray-800">
                                            Что вы получите
                                        </span>
                                    </div>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Полный доступ к материалам
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Практические задания
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            Сертификат о прохождении
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
