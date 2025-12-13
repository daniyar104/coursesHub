import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Play, Clock, GraduationCap, CheckCircle, Lock } from 'lucide-react';
import { useCoursesStore } from '../../store/coursesStore';
import { getModuleTest, getModuleTestResult, getCourseTestResult } from '../../service/testService';
import Header from '../../components/Header/HomeHeader';

const CourseCurriculumPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = useCoursesStore((s) => s.courseDetail);
    const fetchCourseById = useCoursesStore((s) => s.fetchCourseById);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [moduleTestStatus, setModuleTestStatus] = useState<Record<string, { completed: boolean; passed: boolean; score: number } | null>>({});
    const [courseTestResult, setCourseTestResult] = useState<{ completed: boolean; passed: boolean; score: number } | null>(null);

    useEffect(() => {
        if (id) fetchCourseById(id);
    }, [id, fetchCourseById]);

    useEffect(() => {
        // Автоматически выбираем первый модуль
        if (course && course.modules.length > 0 && !selectedModuleId) {
            setSelectedModuleId(course.modules[0].id);
        }
    }, [course, selectedModuleId]);

    // Fetch course test result
    useEffect(() => {
        const fetchCourseResult = async () => {
            if (!course || !course.id) return;
            // Only check if course has a test
            if (course.tests && course.tests.length > 0) {
                try {
                    const result = await getCourseTestResult(course.id);
                    if (result) {
                        setCourseTestResult({
                            completed: true,
                            passed: result.passed,
                            score: result.score
                        });
                    }
                } catch (e) {
                    console.error("Failed to fetch course test result", e);
                }
            }
        };
        fetchCourseResult();
    }, [course]);

    // Fetch module test status
    useEffect(() => {
        const fetchModuleTestStatuses = async () => {
            if (!course) return;

            const statuses: Record<string, { completed: boolean; passed: boolean; score: number } | null> = {};

            for (const module of course.modules) {
                if (module.tests && module.tests.length > 0) {
                    try {
                        // Try fetching result by module ID first (as per existing service function)
                        // If this endpoint exists in backend, it should return the result
                        try {
                            const resultData = await getModuleTestResult(module.id);

                            if (resultData) {
                                statuses[module.id] = {
                                    completed: true,
                                    passed: resultData.passed,
                                    score: resultData.score,
                                };
                                continue; // Found result, move to next module
                            }
                        } catch (e) {
                            // Ignore errors (handled in service now)
                        }

                        // If no result found via module result endpoint, check if test object itself has status
                        // (Fallback, though we saw it doesn't have it)
                        const testData = await getModuleTest(module.id);
                        if (testData && (testData.completed !== undefined || testData.passed !== undefined)) {
                            statuses[module.id] = {
                                completed: testData.completed || false,
                                passed: testData.passed || false,
                                score: testData.score || 0,
                            };
                        }
                    } catch (error) {
                        console.error(`Failed to fetch test status for module ${module.id}:`, error);
                    }
                }
            }

            setModuleTestStatus(statuses);
        };

        fetchModuleTestStatuses();
    }, [course]);

    // console.log(course?.modules.map(less => less.lessons.map(lesson => lesson.completed)))
    if (!course) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                        <p className="text-xl text-gray-600">Загрузка курса...</p>
                    </div>
                </div>
            </>
        );
    }

    const modulesWithProgress = course.modules.map((module) => {
        // Normalize lessons to handle potential backend inconsistency (complete vs completed)
        const normalizedLessons = module.lessons.map(lesson => ({
            ...lesson,
            complete: lesson.complete || lesson.completed || false
        }));

        const totalLessons = normalizedLessons.length;
        const completedLessons = normalizedLessons.filter((l) => l.complete).length;
        const calculatedProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        const calculatedCompleted = totalLessons > 0 && completedLessons === totalLessons;

        return {
            ...module,
            lessons: normalizedLessons,
            completed: module.completed ?? calculatedCompleted,
            progress: module.progress ?? calculatedProgress,
        };
    });

    const selectedModule = modulesWithProgress.find((m) => m.id === selectedModuleId);
    const totalLessons = modulesWithProgress.reduce((acc, mod) => acc + mod.lessons.length, 0);


    return (
        <>
            <Header />

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="max-w-[1400px] mx-auto px-6 py-8">
                    {/* Header */}
                    <button
                        onClick={() => navigate(`/course/${id}`)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Назад к курсу
                    </button>

                    {/* Course Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
                                <p className="text-lg text-gray-600 mb-6">{course.short_description}</p>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-indigo-600" />
                                        <span>{course.modules.length} модулей</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Play className="w-5 h-5 text-indigo-600" />
                                        <span>{totalLessons} уроков</span>
                                    </div>
                                </div>
                            </div>

                            {course.tests && course.tests.length > 0 && (
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        onClick={() => navigate(`/test/course/${course.id}`)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${courseTestResult?.passed
                                            ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                            }`}
                                    >
                                        {courseTestResult?.passed ? (
                                            <>
                                                <CheckCircle className="w-6 h-6" />
                                                <span>Тест пройден</span>
                                            </>
                                        ) : (
                                            <>
                                                <GraduationCap className="w-6 h-6" />
                                                <span>Финальный тест</span>
                                            </>
                                        )}
                                    </button>
                                    {courseTestResult?.passed && (
                                        <span className="text-sm text-emerald-600 font-semibold">
                                            Результат: {courseTestResult.score}%
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content: Sidebar + Lessons */}
                    <div className="flex gap-6">
                        {/* Left Sidebar - Modules */}
                        <div className="w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    Модули курса
                                </h2>
                                <div className="space-y-2">
                                    {modulesWithProgress.map((module, index) => {
                                        const isLocked = index > 0 && !modulesWithProgress[index - 1].completed;

                                        return (
                                            <button
                                                key={module.id}
                                                disabled={isLocked}
                                                onClick={() => !isLocked && setSelectedModuleId(module.id)}
                                                className={`w-full text-left p-4 rounded-xl transition-all ${selectedModuleId === module.id
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                                    : isLocked
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="relative">
                                                        <span
                                                            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${selectedModuleId === module.id
                                                                ? 'bg-white text-indigo-600'
                                                                : isLocked
                                                                    ? 'bg-gray-200 text-gray-400'
                                                                    : 'bg-indigo-100 text-indigo-600'
                                                                }`}
                                                        >
                                                            {isLocked ? <Lock className="w-4 h-4" /> : index + 1}
                                                        </span>
                                                        {/* Completion checkmark for completed modules */}
                                                        {module.completed && (
                                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                                                <CheckCircle className="w-3 h-3 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3
                                                            className={`font-semibold mb-1 line-clamp-2 ${selectedModuleId === module.id
                                                                ? 'text-white'
                                                                : isLocked
                                                                    ? 'text-gray-500'
                                                                    : 'text-gray-900'
                                                                }`}
                                                        >
                                                            {module.title}
                                                        </h3>
                                                        <p
                                                            className={`text-sm mb-2 ${selectedModuleId === module.id
                                                                ? 'text-indigo-100'
                                                                : 'text-gray-500'
                                                                }`}
                                                        >
                                                            {module.lessons.length}{' '}
                                                            {module.lessons.length === 1
                                                                ? 'урок'
                                                                : 'уроков'}
                                                        </p>
                                                        {/* Progress Bar */}
                                                        {module.progress !== undefined && !isLocked && (
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className={selectedModuleId === module.id ? 'text-indigo-100' : 'text-gray-600'}>
                                                                        Прогресс
                                                                    </span>
                                                                    <span className={`font-semibold ${module.progress === 100
                                                                        ? (selectedModuleId === module.id ? 'text-white' : 'text-green-600')
                                                                        : (selectedModuleId === module.id ? 'text-white' : 'text-indigo-600')
                                                                        }`}>
                                                                        {Math.round(module.progress)}%
                                                                    </span>
                                                                </div>
                                                                <div className={`h-2 rounded-full overflow-hidden shadow-inner ${selectedModuleId === module.id ? 'bg-white/30' : 'bg-gray-200'
                                                                    }`}>
                                                                    <div
                                                                        className={`h-full transition-all duration-500 ease-out ${module.progress === 100
                                                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                                            : (selectedModuleId === module.id ? 'bg-white' : 'bg-gradient-to-r from-indigo-500 to-purple-500')
                                                                            }`}
                                                                        style={{ width: `${module.progress}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Lesson Cards */}
                        <div className="flex-1">
                            {selectedModule && (
                                <motion.div
                                    key={selectedModule.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                                {selectedModule.title}
                                            </h2>
                                            {selectedModule.description && (
                                                <p className="text-gray-600 mb-4">
                                                    {selectedModule.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <BookOpen className="w-4 h-4" />
                                                <span>
                                                    {selectedModule.lessons.length} уроков в этом модуле
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lesson Cards Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {selectedModule.lessons.map((lesson, lessonIndex) => {
                                            // Logic for locking lessons:
                                            // 1. First lesson of the first module is always unlocked.
                                            // 2. For subsequent lessons in the SAME module, the previous lesson must be completed.
                                            // 3. Note: If the module itself is unlocked, it implies the previous module is done.
                                            //    So for the first lesson of any *accessible* module, it is unlocked by default.

                                            const isLessonLocked = lessonIndex > 0 && !selectedModule.lessons[lessonIndex - 1].complete;

                                            return (
                                                <React.Fragment key={lesson.id}>
                                                    {/* Lesson Card */}
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.95,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            delay: lessonIndex * 0.05,
                                                        }}
                                                        onClick={() =>
                                                            !isLessonLocked && navigate(`/course/${id}/lesson/${lesson.id}`)
                                                        }
                                                        className={`relative overflow-hidden rounded-2xl border-2 transition-all group ${isLessonLocked
                                                            ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-75'
                                                            : lesson.complete
                                                                ? 'bg-emerald-50/50 border-emerald-100/50 hover:border-emerald-200 cursor-pointer hover:shadow-lg'
                                                                : 'bg-white border-gray-100 hover:border-indigo-200 cursor-pointer hover:shadow-lg'
                                                            }`}
                                                    >
                                                        {lesson.complete && (
                                                            <div className="absolute top-0 right-0 bg-emerald-500 text-white p-1 rounded-bl-xl z-10">
                                                                <CheckCircle className="w-3.5 h-3.5" />
                                                            </div>
                                                        )}

                                                        {isLessonLocked && (
                                                            <div className="absolute top-3 right-3 text-gray-400 z-10">
                                                                <Lock className="w-4 h-4" />
                                                            </div>
                                                        )}

                                                        <div className="p-5">
                                                            <div className="flex items-start gap-4 mb-3">
                                                                <div
                                                                    className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold flex-shrink-0 transition-colors ${isLessonLocked
                                                                        ? 'bg-gray-200 text-gray-400'
                                                                        : lesson.complete
                                                                            ? 'bg-emerald-100 text-emerald-600'
                                                                            : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                                                                        }`}
                                                                >
                                                                    {isLessonLocked ? (
                                                                        <Lock className="w-5 h-5" />
                                                                    ) : lesson.complete ? (
                                                                        <CheckCircle className="w-5 h-5" />
                                                                    ) : (
                                                                        lessonIndex + 1
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4
                                                                        className={`font-semibold mb-1 line-clamp-2 ${lesson.complete
                                                                            ? 'text-emerald-900'
                                                                            : isLessonLocked
                                                                                ? 'text-gray-400'
                                                                                : 'text-gray-900 group-hover:text-indigo-600 transition-colors'
                                                                            }`}
                                                                    >
                                                                        {lesson.title}
                                                                    </h4>
                                                                    <p
                                                                        className={`text-xs line-clamp-2 ${isLessonLocked
                                                                            ? 'text-gray-300'
                                                                            : 'text-gray-500'
                                                                            }`}
                                                                    >
                                                                        {lesson.content}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className={`flex items-center justify-between pt-4 border-t ${lesson.complete ? 'border-emerald-200/50' : 'border-gray-100'}`}>
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`flex items-center gap-2 text-sm ${isLessonLocked ? 'text-gray-300' : lesson.complete ? 'text-emerald-600' : 'text-gray-500'}`}>
                                                                        <Clock className="w-4 h-4" />
                                                                        <span>~15 мин</span>
                                                                    </div>
                                                                    {/* Test indicator */}
                                                                    {lesson.tests && lesson.tests.length > 0 && !isLessonLocked && (
                                                                        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md font-semibold ${lesson.tests[0]?.passed
                                                                                ? 'bg-emerald-500 text-white'
                                                                                : 'bg-purple-500 text-white'
                                                                            }`}>
                                                                            <GraduationCap className="w-3 h-3" />
                                                                            <span>
                                                                                {lesson.tests[0]?.passed
                                                                                    ? `Тест: ${lesson.tests[0]?.score}%`
                                                                                    : 'Есть тест'}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {!isLessonLocked && (
                                                                    lesson.complete ? (
                                                                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                                                            <span>Пройден</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:text-indigo-700">
                                                                            <span>Начать</span>
                                                                            <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </React.Fragment>
                                            );
                                        })}
                                        {selectedModule.tests && selectedModule.tests.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: selectedModule.lessons.length * 0.05 }}
                                                onClick={() => navigate(`/test/module/${selectedModule.id}`)}
                                                className={`rounded-2xl transition-all cursor-pointer border-2 group overflow-hidden relative ${moduleTestStatus[selectedModule.id]?.passed
                                                    ? 'bg-emerald-50/80 border-emerald-500/50 hover:border-emerald-500 hover:shadow-emerald-100 shadow-md hover:shadow-xl'
                                                    : 'bg-white border-gray-100 hover:border-indigo-200 shadow-md hover:shadow-xl'
                                                    }`}
                                            >
                                                {/* Completion Badge Overlay */}
                                                {moduleTestStatus[selectedModule.id]?.passed && (
                                                    <div className="absolute top-0 right-0 z-10">
                                                        <div className="bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-bl-xl shadow-sm flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            <span>Пройден</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="p-6">
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className={`flex items-center justify-center w-12 h-12 rounded-2xl text-lg font-bold transition-all flex-shrink-0 shadow-sm ${moduleTestStatus[selectedModule.id]?.passed
                                                            ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-105'
                                                            : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105'
                                                            }`}>
                                                            {moduleTestStatus[selectedModule.id]?.passed ? (
                                                                <CheckCircle className="w-6 h-6" />
                                                            ) : (
                                                                selectedModule.lessons.length + 1
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0 pt-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className={`text-lg font-bold transition-colors line-clamp-2 ${moduleTestStatus[selectedModule.id]?.passed
                                                                    ? 'text-emerald-900'
                                                                    : 'text-gray-900 group-hover:text-indigo-700'
                                                                    }`}>
                                                                    Тест модуля: {selectedModule.title}
                                                                </h3>
                                                            </div>
                                                            <p className={`text-sm line-clamp-2 ${moduleTestStatus[selectedModule.id]?.passed
                                                                ? 'text-emerald-700/70'
                                                                : 'text-gray-500'
                                                                }`}>
                                                                {moduleTestStatus[selectedModule.id]?.passed
                                                                    ? `Результат: ${moduleTestStatus[selectedModule.id]?.score}%`
                                                                    : 'Проверьте свои знания по материалам модуля'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className={`flex items-center justify-between pt-4 border-t ${moduleTestStatus[selectedModule.id]?.passed
                                                        ? 'border-emerald-200/50'
                                                        : 'border-gray-100'
                                                        }`}>
                                                        <div className={`flex items-center gap-2 text-sm ${moduleTestStatus[selectedModule.id]?.passed
                                                            ? 'text-emerald-600'
                                                            : 'text-gray-500'
                                                            }`}>
                                                            <Clock className="w-4 h-4" />
                                                            <span>~20 мин</span>
                                                        </div>
                                                        {moduleTestStatus[selectedModule.id]?.passed ? (
                                                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                                                <span>Повторить</span>
                                                                <Play className="w-4 h-4" />
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 text-indigo-600 group-hover:text-indigo-700 font-bold text-sm">
                                                                <span>Начать</span>
                                                                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default CourseCurriculumPage;
