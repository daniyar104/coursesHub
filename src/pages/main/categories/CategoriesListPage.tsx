import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCategoriesStore } from "../../../store/categoriesStore";
import { BookOpen, Sparkles, TrendingUp } from "lucide-react";

const CategoriesListPage: React.FC = () => {
    const { categories, loading, error, fetchCategories } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl text-gray-600">Загрузка категорий...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
                    <p className="text-xl text-red-600 mb-4">❌ {error}</p>
                    <button
                        onClick={fetchCategories}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                    >
                        Попробовать снова
                    </button>
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

    const gradients = [
        "from-violet-500 to-purple-600",
        "from-blue-500 to-cyan-600",
        "from-emerald-500 to-teal-600",
        "from-orange-500 to-red-600",
        "from-pink-500 to-rose-600",
        "from-indigo-500 to-blue-600",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <Sparkles className="w-12 h-12 mr-3" />
                            <h1 className="text-5xl md:text-6xl font-bold">
                                Категории курсов
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
                            Выберите направление и начните свой путь к новым знаниям
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="rgb(238, 242, 255)"
                        />
                    </svg>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {categories && categories.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {categories.map((category, index) => (
                            <motion.div key={category.id} variants={item}>
                                <Link to={`/home/category/${category.id}`}>
                                    <div className="group relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                                        {/* Gradient Header */}
                                        <div
                                            className={`h-32 bg-gradient-to-br ${gradients[index % gradients.length]
                                                } relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0">
                                                <svg
                                                    viewBox="0 0 400 40"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0 40L13.3 35C26.7 30 53.3 20 80 15C106.7 10 133.3 10 160 12.5C186.7 15 213.3 20 240 22.5C266.7 25 293.3 25 320 25C346.7 25 373.3 25 386.7 25L400 25V40H386.7C373.3 40 346.7 40 320 40C293.3 40 266.7 40 240 40C213.3 40 186.7 40 160 40C133.3 40 106.7 40 80 40C53.3 40 26.7 40 13.3 40H0Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {category.description || "Изучайте новые навыки и развивайтесь вместе с нами"}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <TrendingUp className="w-4 h-4 mr-2" />
                                                <span>Популярное направление</span>
                                            </div>
                                        </div>

                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400 rounded-2xl transition-all pointer-events-none"></div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-2xl text-gray-600">Категории не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesListPage;
