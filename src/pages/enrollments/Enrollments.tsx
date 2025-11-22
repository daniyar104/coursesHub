import { useNavigate, useParams } from "react-router-dom";
import { useCoursesStore } from "../../store/coursesStore";
import { useEffect, useState } from "react";
import {
    CheckCircle,
    Clock,
    ArrowRight,
    BookOpen,
    Download,
} from "lucide-react";

export default function Enrollments() {
    const { id } = useParams<{ id: string }>();
    const course = useCoursesStore((s) => s.courseDetail);
    const loading = useCoursesStore((s) => s.loading);
    const error = useCoursesStore((s) => s.error);
    const fetchCourseById = useCoursesStore((s) => s.fetchCourseById);
    const fetchRegisterCourse = useCoursesStore((s) => s.fetchRegisterCourse);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            if (!id) return;

            await fetchCourseById(id);

            const currentCourse = useCoursesStore.getState().courseDetail;
            if (currentCourse) {
                const res = await fetchRegisterCourse(id);
                if (res?.success) setSuccess(true);
            }
        };

        load();
    }, [id, fetchCourseById, fetchRegisterCourse]);

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

    if (!course)
        return <p className="text-center mt-20 text-lg">Курс не найден</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Верхняя часть: Статус */}
                <div
                    className={`p-8 text-center ${
                        success ? "bg-green-50" : "bg-amber-50"
                    }`}
                >
                    <div className="flex justify-center mb-4">
                        {success ? (
                            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce-short">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                        ) : (
                            <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center">
                                <Clock className="h-10 w-10 text-amber-600 animate-spin-slow" />
                            </div>
                        )}
                    </div>

                    <h1
                        className={`text-2xl font-bold mb-2 ${
                            success ? "text-green-800" : "text-amber-800"
                        }`}
                    >
                        {success
                            ? "Оплата прошла успешно!"
                            : "Обработка платежа..."}
                    </h1>
                    <p
                        className={`text-sm ${
                            success ? "text-green-600" : "text-amber-600"
                        }`}
                    >
                        {success
                            ? "Спасибо за покупку. Доступ к материалам открыт."
                            : "Пожалуйста, подождите. Мы подтверждаем транзакцию."}
                    </p>
                </div>

                {/* Основная часть: Детали заказа */}
                <div className="p-8">
                    <div className="mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Приобретенный курс
                        </p>
                        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                            {course.title || "Название курса"}
                        </h2>
                        <p className="text-gray-500 text-sm line-clamp-2">
                            {course.full_description || "Описание курса..."}
                        </p>
                    </div>

                    {/* Информационный блок (чек) */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">
                                Категория
                            </span>
                            <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                                {course.categories?.name || "Без категории"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                            <span className="text-sm text-gray-500">Итого</span>
                            <span className="text-lg font-bold text-indigo-600">
                                {course.price
                                    ? `${course.price.toLocaleString()} ₸`
                                    : "Бесплатно"}
                            </span>
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    {success && (
                        <div className="space-y-3">
                            <button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 flex items-center justify-center gap-2 group"
                                onClick={() => {
                                    navigate(`/course/${id}`);
                                }}
                            >
                                <BookOpen className="w-5 h-5" />
                                Перейти к обучению
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                Скачать чек
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
