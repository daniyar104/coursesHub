import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCategoriesStore } from "../../../store/categoriesStore";
import { BookOpen } from "lucide-react";
import Header from "../../../components/Header/HomeHeader";

const CategoriesListPage: React.FC = () => {
    const { categories, loading, error, fetchCategories } =
        useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                    <p className="text-xl text-gray-600">
                        Загрузка категорий...
                    </p>
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
        <div className="min-h-screen bg-[#F8F9FB]">
            <Header />

            <div className="max-w-[1350px] w-[90%] mx-auto py-10">
                {/* Page Title */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-[#37368C] mb-4">
                        Категории курсов
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl">
                        Выберите направление и начните свой путь к новым знаниям
                    </p>
                </div>

                {/* Categories Grid */}
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
                                    <div className="group relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200">
                                        {/* Simplified Header Area */}
                                        <div className={`h-24 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-90 group-hover:opacity-100 transition-opacity relative`}>
                                            <div className="absolute -bottom-6 right-6 bg-white p-3 rounded-xl shadow-lg">
                                                <BookOpen className="w-8 h-8 text-indigo-600" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 pt-10">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                                                {category.description ||
                                                    "Изучайте новые навыки и развивайтесь вместе с нами"}
                                            </p>

                                            <div className="flex items-center text-sm font-medium text-indigo-500 pt-4 border-t border-gray-50">
                                                <span>Перейти к курсам</span>
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-6">📚</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Категории не найдены</h3>
                        <p className="text-gray-500">Попробуйте обновить страницу позже</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesListPage;
