import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import Header from "../../../components/Header/HomeHeader";
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
        <div className="min-h-screen bg-[#F8F9FB]">
            <Header />

            <div className="max-w-[1350px] w-[90%] mx-auto py-10">
                {/* Custom Breadcrumb / Back Navigation */}
                <div className="mb-6">
                    <Link
                        to="/categories"
                        className="inline-flex items-center text-gray-500 hover:text-[#37368C] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="font-medium">Назад к категориям</span>
                    </Link>
                </div>

                {/* Header Section */}
                <div className="mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-bold text-[#37368C] mb-3">
                                    {category?.name || "Категория"}
                                </h1>
                                <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
                                    {category?.description || "Изучайте курсы в этой категории"}
                                </p>
                            </div>
                            <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 whitespace-nowrap">
                                <span className="text-3xl font-bold text-[#37368C]">{filteredCourses.length}</span>
                                <span className="text-gray-500 font-medium">активных курсов</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Courses Grid */}
                {filteredCourses.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredCourses.map((course) => (
                            <motion.div key={course.id} variants={item}>
                                <Link to={`/course/${course.id}`}>
                                    <div className="group h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200">
                                        {/* Course Image Area */}
                                        <div className="relative h-48 bg-gray-100 overflow-hidden">
                                            {/* Gradient Overlay as placeholder or image fallback */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:scale-105 transition-transform duration-500"></div>

                                            <div className="absolute top-4 right-4 z-10">
                                                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm border border-indigo-50">
                                                    {course.difficulty_level}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <BookOpen className="w-16 h-16 text-indigo-200" />
                                            </div>
                                        </div>

                                        {/* Course Content */}
                                        <div className="p-6">
                                            <div className="mb-4 h-14">
                                                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                    {course.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">
                                                {course.short_description}
                                            </p>

                                            {/* Stats Row */}
                                            <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-50">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                        <span className="font-medium text-gray-600">{Number(course.avg_rating).toFixed(1)}</span>
                                                    </div>
                                                    {course._count && (
                                                        <div className="flex items-center gap-1.5">
                                                            <BookOpen className="w-4 h-4" />
                                                            <span>{course._count.modules} тем</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Курсы не найдены</h3>
                        <p className="text-gray-500">В этой категории пока нет доступных курсов</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
