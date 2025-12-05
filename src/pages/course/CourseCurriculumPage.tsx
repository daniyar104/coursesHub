import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Play, Clock, GraduationCap, CheckCircle } from 'lucide-react';
import { useCoursesStore } from '../../store/coursesStore';
import Header from '../../components/Header/HomeHeader';
import { getModuleTest, getCourseTest } from '../../service/testService';

const CourseCurriculumPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = useCoursesStore((s) => s.courseDetail);
    const fetchCourseById = useCoursesStore((s) => s.fetchCourseById);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    // Test states
    const [moduleHasTest, setModuleHasTest] = useState<Record<string, boolean>>({});
    const [courseHasTest, setCourseHasTest] = useState(false);

    useEffect(() => {
        if (id) fetchCourseById(id);
    }, [id, fetchCourseById]);

    useEffect(() => {
        // Автоматически выбираем первый модуль
        if (course && course.modules.length > 0 && !selectedModuleId) {
            setSelectedModuleId(course.modules[0].id);
        }
    }, [course, selectedModuleId]);

    // Check for tests availability
    useEffect(() => {
        const checkTests = async () => {
            if (!course) return;

            // Check course test
            try {
                const courseTest = await getCourseTest(course.id);
                if (courseTest) setCourseHasTest(true);
            } catch (e) {
                console.error("Failed to check course test", e);
            }

            // Check module tests
            const moduleTests: Record<string, boolean> = {};
            for (const module of course.modules) {
                try {
                    const moduleTest = await getModuleTest(module.id);
                    console.log(`Module ${module.id} test result:`, moduleTest, `Type: ${typeof moduleTest}`, `Truthy: ${!!moduleTest}`);
                    // Check if moduleTest is a valid object (not null, undefined, or empty string)
                    if (moduleTest && typeof moduleTest === 'object') {
                        moduleTests[module.id] = true;
                    }
                } catch (e) {
                    console.error(`Failed to check module test for ${module.id}`, e);
                }
            }
            setModuleHasTest(moduleTests);
            console.log("Module tests check complete:", moduleTests);
        };

        checkTests();
    }, [course]);

    useEffect(() => {
        console.log("Current moduleHasTest state:", moduleHasTest);
        console.log("Selected module ID:", selectedModuleId);
    }, [moduleHasTest, selectedModuleId]);


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

    const selectedModule = course.modules.find((m) => m.id === selectedModuleId);
    const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);

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

                            {courseHasTest && (
                                <button
                                    onClick={() => navigate(`/test/course/${course.id}`)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                                >
                                    <GraduationCap className="w-6 h-6" />
                                    <span>Финальный тест</span>
                                </button>
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
                                    {course.modules.map((module, index) => (
                                        <button
                                            key={module.id}
                                            onClick={() => setSelectedModuleId(module.id)}
                                            className={`w-full text-left p-4 rounded-xl transition-all ${selectedModuleId === module.id
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="relative">
                                                    <span
                                                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${selectedModuleId === module.id
                                                                ? 'bg-white text-indigo-600'
                                                                : 'bg-indigo-100 text-indigo-600'
                                                            }`}
                                                    >
                                                        {index + 1}
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
                                                    {module.progress !== undefined && (
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
                                    ))}
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
                                        {selectedModule.lessons.map((lesson, lessonIndex) => (
                                            <motion.div
                                                key={lesson.id}
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
                                                    navigate(`/course/${id}/lesson/${lesson.id}`)
                                                }
                                                className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer border-2 group overflow-hidden relative ${lesson.complete
                                                        ? 'border-green-200 hover:border-green-300 bg-gradient-to-br from-white to-green-50/30'
                                                        : 'border-gray-100 hover:border-indigo-200'
                                                    }`}
                                            >
                                                {/* Completion Badge Overlay */}
                                                {lesson.complete && (
                                                    <div className="absolute top-3 right-3 z-10">
                                                        <div className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            <span>Пройден</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="p-6">
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold transition-all flex-shrink-0 shadow-sm ${lesson.complete
                                                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white group-hover:scale-110'
                                                                : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105'
                                                            }`}>
                                                            {lesson.complete ? (
                                                                <CheckCircle className="w-7 h-7" />
                                                            ) : (
                                                                lessonIndex + 1
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h3 className={`text-lg font-bold transition-colors line-clamp-2 ${lesson.complete
                                                                        ? 'text-gray-800 group-hover:text-green-700'
                                                                        : 'text-gray-900 group-hover:text-indigo-700'
                                                                    }`}>
                                                                    {lesson.title}
                                                                </h3>
                                                            </div>
                                                            {lesson.content && (
                                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                                    {lesson.content}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <Clock className="w-4 h-4" />
                                                            <span>~15 мин</span>
                                                        </div>
                                                        {lesson.complete ? (
                                                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                                                <CheckCircle className="w-5 h-5" />
                                                                <span>Завершено</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 text-indigo-600 group-hover:text-indigo-700 font-semibold">
                                                                <span>Начать</span>
                                                                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                        {moduleHasTest[selectedModule.id] && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: selectedModule.lessons.length * 0.05 }}
                                                onClick={() => navigate(`/test/module/${selectedModule.id}`)}
                                                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer border border-gray-100 hover:border-indigo-200 group overflow-hidden"
                                            >
                                                <div className="p-6">
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white rounded-xl text-lg font-bold transition-colors flex-shrink-0">
                                                            {selectedModule.lessons.length + 1}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2 line-clamp-2">
                                                                Тест модуля: {selectedModule.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                                Проверьте свои знания по материалам модуля
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <Clock className="w-4 h-4" />
                                                            <span>~20 мин</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-indigo-600 group-hover:text-indigo-700 font-semibold">
                                                            <span>Начать</span>
                                                            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </div>
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
