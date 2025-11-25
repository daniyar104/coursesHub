import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/HomeHeader";
import { useCoursesStore } from "../../store/coursesStore";
import { BookOpen, Clock, TrendingUp } from "lucide-react";

export default function MyCoursesPage() {
    const navigate = useNavigate();
    const { enrolledCourses, fetchEnrolledCourses, loading, error } = useCoursesStore();

    useEffect(() => {
        fetchEnrolledCourses();
    }, [fetchEnrolledCourses]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="max-w-[1320px] w-9/10 mx-auto py-20 text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />

            <div className="max-w-[1320px] w-9/10 mx-auto py-12">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Мои курсы
                    </h1>
                    <p className="text-xl text-gray-600">
                        Продолжайте обучение и отслеживайте свой прогресс
                    </p>
                </div>

                {/* Stats Overview */}
                {enrolledCourses && enrolledCourses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <div className="text-3xl font-bold mb-1">{enrolledCourses.length}</div>
                            <div className="text-indigo-100">Активных курсов</div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <div className="text-3xl font-bold mb-1">
                                {Math.round(
                                    enrolledCourses.reduce((acc, course) => {
                                        const progress = parseFloat(course.enrollment.progress) || 0;
                                        return acc + progress;
                                    }, 0) / enrolledCourses.length
                                )}%
                            </div>
                            <div className="text-emerald-100">Средний прогресс</div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="w-8 h-8" />
                            </div>
                            <div className="text-3xl font-bold mb-1">
                                {enrolledCourses.filter(c => c.enrollment.status === 'active').length}
                            </div>
                            <div className="text-amber-100">В процессе</div>
                        </div>
                    </div>
                )}

                {/* Courses Grid */}
                {enrolledCourses && enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledCourses.map((course) => {
                            const progress = parseFloat(course.enrollment.progress) || 0;
                            const isCompleted = course.enrollment.status === 'completed';

                            return (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                                    onClick={() => navigate(`/course/${course.id}/curriculum`)}
                                >
                                    {/* Course Header */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-indigo-600 font-semibold">
                                                    {course.categories.name}
                                                </p>
                                            </div>
                                            {isCompleted && (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                    Завершен
                                                </span>
                                            )}
                                        </div>

                                        {/* Course Stats */}
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                <span>{course._count.modules} модулей</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{course._count.lessons} уроков</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Прогресс
                                                </span>
                                                <span className="text-sm font-bold text-indigo-600">
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full transition-all duration-300 ${isCompleted
                                                        ? 'bg-green-500'
                                                        : 'bg-indigo-600'
                                                        }`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Enrollment Date */}
                                        <div className="text-xs text-gray-500">
                                            Записан: {new Date(course.enrollment.enrolled_at).toLocaleDateString('ru-RU')}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="px-6 pb-6">
                                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                                            {isCompleted ? 'Повторить курс' : 'Продолжить обучение'}
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                            У вас пока нет курсов
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Начните обучение, выбрав курс из каталога
                        </p>
                        <button
                            onClick={() => navigate('/categories')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                        >
                            Перейти к курсам
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
