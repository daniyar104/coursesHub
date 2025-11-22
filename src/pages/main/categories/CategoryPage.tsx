import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, Star, Users, TrendingUp } from "lucide-react";
import { useCoursesStore } from "../../../store/coursesStore";
import { useCategoriesStore } from "../../../store/categoriesStore";

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { courses, loading: coursesLoading, fetchAllCourses } = useCoursesStore();
    const { categories, fetchCategories } = useCategoriesStore();
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

    useEffect(() => {
        fetchAllCourses();
        fetchCategories();
    }, [fetchAllCourses, fetchCategories]);

    useEffect(() => {
        if (courses && slug) {
            const filtered = courses.filter((course) => course.category_id === slug);
            setFilteredCourses(filtered);
        }
    }, [courses, slug]);

    const category = categories?.find((cat) => cat.id === slug);

    if (coursesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl text-gray-600">Загрузка курсов...</p>
                </div>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <Link
                        to="/categories"
                        className="inline-flex items-center text-white/90 hover:text-white mb-6 transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Назад к категориям
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-5xl font-bold mb-4">
                                    {category?.name || "Категория"}
                                </h1>
                                <p className="text-xl text-indigo-100 max-w-3xl">
                                    {category?.description || "Изучайте курсы в этой категории"}
                                </p>
                            </div>
                            <div className="hidden md:block text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <div className="text-4xl font-bold">{filteredCourses.length}</div>
                                <div className="text-indigo-100">курсов</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {filteredCourses.length > 0 ? (
                    <>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Доступные курсы
                            </h2>
                            <p className="text-gray-600">
                                Начните обучение с любого курса
                            </p>
                        </div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredCourses.map((course) => (
                                <motion.div key={course.id} variants={item}>
                                    <Link to={`/course/${course.id}`}>
                                        <div className="group h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                                            {/* Course Image */}
                                            <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-purple-500 overflow-hidden">
                                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-indigo-600">
                                                    {course.difficulty_level}
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <BookOpen className="w-20 h-20 text-white/30" />
                                                </div>
                                            </div>

                                            {/* Course Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {course.short_description}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                        <span>{Number(course.avg_rating).toFixed(1)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        <span>{course.review_count}</span>
                                                    </div>
                                                    {course._count && (
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="w-4 h-4" />
                                                            <span>{course._count.modules} модулей</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* CTA */}
                                                <div className="pt-4 border-t border-gray-100">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">
                                                            <Clock className="w-4 h-4 inline mr-1" />
                                                            Начать сейчас
                                                        </span>
                                                        <TrendingUp className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hover Border */}
                                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400 rounded-2xl transition-all pointer-events-none"></div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-2xl text-gray-600 mb-2">Курсы не найдены</p>
                        <p className="text-gray-500">В этой категории пока нет доступных курсов</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
