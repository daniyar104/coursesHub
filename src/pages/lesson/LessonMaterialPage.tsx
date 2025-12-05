import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/HomeHeader";
import { getLessonMaterial, markLessonComplete, markLessonAccess } from "../../service/lessonService";
import { getLessonTest } from "../../service/testService";
import { useCoursesStore } from "../../store/coursesStore";
import type { LessonMaterial, Lesson } from "../../service/types";
import { FileText, Download, Clock, AlertCircle, ArrowRight, CheckCircle, ClipboardList } from "lucide-react";
import PDFSlider from "../../components/ui/PDFSlider/PDFSlider";

export default function LessonMaterialPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [material, setMaterial] = useState<LessonMaterial | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
    const [completingLesson, setCompletingLesson] = useState(false);
    const [hasTest, setHasTest] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const course = useCoursesStore((s) => s.courseDetail);
    const fetchCourseById = useCoursesStore((s) => s.fetchCourseById);

    useEffect(() => {
        const fetchMaterial = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const data = await getLessonMaterial(id);
                console.log("Loaded material:", data);
                setMaterial(data);

                // Set completion status from material data
                if (data.complete !== undefined) {
                    setIsCompleted(data.complete);
                }

                // Если courseId есть в ответе, используем его
                if (data.courseId && fetchCourseById) {
                    console.log("Fetching course with ID:", data.courseId);
                    fetchCourseById(data.courseId);

                    // Отмечаем доступ к уроку
                    try {
                        await markLessonAccess(data.courseId, id);
                    } catch (err) {
                        console.error("Failed to mark lesson access:", err);
                    }
                } else {
                    console.warn("No courseId in material data - will try to get from course context");
                }

                // Check if lesson has a test
                try {
                    const test = await getLessonTest(id);
                    if (test) {
                        setHasTest(true);
                    }
                } catch (err) {
                    console.error("Failed to check for test:", err);
                }

            } catch (err: any) {
                console.error("Failed to load material:", err);
                if (err.response?.status === 401) {
                    setError("Ваша сессия истекла. Пожалуйста, войдите заново.");
                } else if (err.response?.status === 404) {
                    setError(err.response?.data?.message || "Материал не найден");
                } else {
                    setError("Не удалось загрузить материал");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMaterial();
    }, [id, fetchCourseById]);

    // Определяем следующий урок и статус завершения текущего урока
    useEffect(() => {
        if (!course || !id) return;

        let found = false;
        let next: Lesson | null = null;
        let currentLesson: Lesson | null = null;

        for (const module of course.modules) {
            for (let i = 0; i < module.lessons.length; i++) {
                if (found) {
                    next = module.lessons[i];
                    break;
                }
                if (module.lessons[i].id === id) {
                    currentLesson = module.lessons[i];
                    found = true;
                    // Проверяем есть ли следующий урок в этом модуле
                    if (i + 1 < module.lessons.length) {
                        next = module.lessons[i + 1];
                        break;
                    }
                }
            }
            if (next) break;
        }

        setNextLesson(next);

        // Обновляем статус завершения из данных курса
        if (currentLesson) {
            console.log("Current lesson from course:", currentLesson);
            console.log("Lesson complete status:", currentLesson.complete);
            setIsCompleted(currentLesson.complete || false);
        }
    }, [course, id]);

    const handleCompleteAndNext = async () => {
        console.log("handleCompleteAndNext called");
        console.log("id:", id);
        console.log("course:", course);
        console.log("nextLesson:", nextLesson);

        // Получаем courseId из загруженного курса
        const courseId = course?.id;

        if (!id || !courseId) {
            console.error("Missing required data:", { id, courseId });
            alert("Не удалось определить курс. Пожалуйста, вернитесь к списку уроков и попробуйте снова.");
            return;
        }

        setCompletingLesson(true);

        try {
            // Отмечаем урок как завершенный
            console.log("Marking lesson complete:", courseId, id);
            const result = await markLessonComplete(courseId, id);
            console.log("Lesson completed, progress:", result.progress);

            // Update completion status
            setIsCompleted(true);

            // Обновляем данные курса чтобы получить актуальный статус
            if (fetchCourseById) {
                await fetchCourseById(courseId);
            }

            // Переходим к следующему уроку если он есть
            if (nextLesson) {
                navigate(`/lesson/${nextLesson.id}/material`);
            }
        } catch (err) {
            console.error("Failed to mark lesson complete:", err);
            alert("Не удалось сохранить прогресс. Попробуйте еще раз.");
            // Если есть следующий урок, всё равно переходим
            if (nextLesson) {
                navigate(`/lesson/${nextLesson.id}/material`);
            }
        } finally {
            setCompletingLesson(false);
        }
    };

    const getMaterialType = (url: string): 'pdf' | 'video' | 'other' => {
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes('.pdf')) return 'pdf';
        if (lowerUrl.includes('.mp4') || lowerUrl.includes('.webm') || lowerUrl.includes('.mov')) return 'video';
        return 'other';
    };

    const formatTimeRemaining = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} мин`;
        const hours = Math.floor(minutes / 60);
        return `${hours} ч`;
    };

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
                <div className="max-w-[1320px] w-9/10 mx-auto py-20">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto text-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-red-800 mb-4">Ошибка</h2>
                        <p className="text-red-600 mb-6">{error}</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                            >
                                Назад
                            </button>
                            {error.includes("сессия") && (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                                >
                                    Войти
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!material) {
        return (
            <>
                <Header />
                <div className="max-w-[1320px] w-9/10 mx-auto py-20 text-center">
                    <p className="text-gray-600 text-lg">Материал не найден</p>
                </div>
            </>
        );
    }

    const materialType = getMaterialType(material.materialUrl);

    return (
        <>
            <Header />

            <div className="max-w-[1320px] w-9/10 mx-auto py-8">
                {/* Header Section */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Назад к уроку
                    </button>

                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {material.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Ссылка действительна: {formatTimeRemaining(material.expiresIn)}</span>
                                </div>
                            </div>
                        </div>

                        <a
                            href={material.materialUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            Скачать
                        </a>
                    </div>
                </div>

                {/* Material Viewer */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
                    {materialType === 'pdf' && (
                        <PDFSlider fileUrl={material.materialUrl} title={material.title} />
                    )}

                    {materialType === 'video' && (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                            <video
                                controls
                                className="w-full h-full"
                            >
                                <source src={material.materialUrl} />
                                Ваш браузер не поддерживает видео.
                            </video>
                        </div>
                    )}

                    {materialType === 'other' && (
                        <div className="p-12 text-center">
                            <FileText className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                                Материал доступен для скачивания
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Этот тип файла не может быть отображен в браузере
                            </p>
                            <a
                                href={material.materialUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Скачать материал
                            </a>
                        </div>
                    )}
                </div>

                {/* Info Alert */}
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Важная информация</p>
                            <p>
                                Ссылка на материал действительна в течение {formatTimeRemaining(material.expiresIn)}.
                                После истечения времени обновите страницу, чтобы получить новую ссылку.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Test Button */}
                {hasTest && (
                    <div className="mt-6">
                        <button
                            onClick={() => navigate(`/test/lesson/${id}`)}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                        >
                            <ClipboardList className="w-6 h-6" />
                            <span>Пройти тест к уроку</span>
                        </button>
                    </div>
                )}

                {/* Next Lesson Button */}
                {nextLesson && (
                    <div className="mt-6">
                        <button
                            onClick={handleCompleteAndNext}
                            disabled={completingLesson || isCompleted}
                            className={`w-full font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${isCompleted
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                                }`}
                        >
                            {completingLesson ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Сохранение прогресса...</span>
                                </>
                            ) : isCompleted ? (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    <span>Урок завершен</span>
                                    <CheckCircle className="w-6 h-6" />
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    <span>Завершить и перейти к следующему уроку</span>
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                        {!isCompleted && (
                            <p className="text-center text-sm text-gray-600 mt-2">
                                Следующий урок: <span className="font-semibold">{nextLesson.title}</span>
                            </p>
                        )}
                        {isCompleted && (
                            <p className="text-center text-sm text-green-600 mt-2 font-semibold">
                                ✓ Вы уже завершили этот урок
                            </p>
                        )}
                    </div>
                )}

                {!nextLesson && course && (
                    <div className="mt-6">
                        <button
                            onClick={handleCompleteAndNext}
                            disabled={completingLesson || isCompleted}
                            className={`w-full font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6 ${isCompleted
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                                }`}
                        >
                            {completingLesson ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Сохранение прогресса...</span>
                                </>
                            ) : isCompleted ? (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    <span>Урок завершен</span>
                                    <CheckCircle className="w-6 h-6" />
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    <span>Завершить урок</span>
                                </>
                            )}
                        </button>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-green-800 mb-2">Поздравляем!</h3>
                            <p className="text-green-700 mb-4">
                                {isCompleted
                                    ? 'Вы завершили этот урок и все остальные уроки курса!'
                                    : 'Вы завершили все уроки этого курса'
                                }
                            </p>
                            <button
                                onClick={() => navigate('/my-courses')}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                            >
                                Вернуться к моим курсам
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}
