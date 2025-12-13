import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Trophy,
    RotateCcw,
    Home,
} from 'lucide-react';
import { useTestStore } from '../../store/useTestStore';
import Header from '../../components/Header/HomeHeader';

const CourseTestPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const {
        currentTest,
        loading,
        error,
        result,
        fetchCourseTest,
        setAnswer,
        submitTest,
    } = useTestStore();

    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [previousResult, setPreviousResult] = useState<{ score: number; passed: boolean } | null>(null);

    useEffect(() => {
        if (courseId) {
            fetchCourseTest(courseId);
        }
    }, [courseId, fetchCourseTest]);

    // Check if test was previously completed
    useEffect(() => {
        if (currentTest && currentTest.completed) {
            setPreviousResult({
                score: currentTest.score || 0,
                passed: currentTest.passed || false,
            });
        }
    }, [currentTest]);

    // Timer
    useEffect(() => {
        if (currentTest && !showResults) {
            const interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [currentTest, showResults]);

    // Update when result is received
    useEffect(() => {
        if (result) {
            setShowResults(true);
        }
    }, [result]);

    const handleAnswerSelect = (questionId: string, answerId: string) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
        setAnswer(questionId, answerId);
    };

    const handleSubmit = async () => {
        if (!currentTest) return;

        const answeredCount = Object.keys(selectedAnswers).length;
        const totalQuestions = currentTest.questions.length;

        if (answeredCount < totalQuestions) {
            const confirmSubmit = window.confirm(
                `Вы ответили только на ${answeredCount} из ${totalQuestions} вопросов. Продолжить?`
            );
            if (!confirmSubmit) return;
        }

        await submitTest();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = () => {
        if (!currentTest) return 0;
        return (Object.keys(selectedAnswers).length / currentTest.questions.length) * 100;
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                        <p className="text-xl text-gray-600">Загрузка теста...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !currentTest) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                    <div className="text-center max-w-md">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Тест не найден
                        </h2>
                        <p className="text-gray-600 mb-6">
                            К сожалению, для этого курса финальный тест не доступен.
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 mx-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Вернуться назад
                        </button>
                    </div>
                </div>
            </>
        );
    }

    if (showResults && result) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
                    <div className="max-w-3xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                        >
                            {/* Result Icon */}
                            <div className="text-center mb-8">
                                {result.passed ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                    >
                                        <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                            Поздравляем! 🎉
                                        </h1>
                                        <p className="text-xl text-gray-600">
                                            Вы успешно завершили курс!
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                    >
                                        <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                            Попробуйте еще раз
                                        </h1>
                                        <p className="text-xl text-gray-600">
                                            Не расстраивайтесь, вы можете пройти тест снова
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Score Display */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8">
                                <div className="text-center">
                                    <p className="text-gray-600 mb-2">Ваш результат</p>
                                    <div className="flex items-center justify-center gap-4">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.4 }}
                                            className={`text-6xl font-bold ${result.passed ? 'text-green-600' : 'text-red-600'
                                                }`}
                                        >
                                            {result.score}%
                                        </motion.div>
                                    </div>
                                    <p className="text-gray-600 mt-4">
                                        Проходной балл: {currentTest.passing_score}%
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <Clock className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Время</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {formatTime(timeElapsed)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-center">
                                    <CheckCircle className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">Вопросов</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {currentTest.questions.length}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => navigate(`/course/${courseId}/curriculum`)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                                >
                                    <Home className="w-5 h-5" />
                                    Вернуться к курсу
                                </button>
                                {!result.passed && (
                                    <button
                                        onClick={() => {
                                            setShowResults(false);
                                            setSelectedAnswers({});
                                            setTimeElapsed(0);
                                            if (courseId) fetchCourseTest(courseId);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Пройти снова
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Header */}
                    <button
                        onClick={() => navigate(`/course/${courseId}/curriculum`)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Вернуться к курсу
                    </button>

                    {/* Test Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {currentTest.title}
                                </h1>
                                {currentTest.description && (
                                    <p className="text-gray-600">{currentTest.description}</p>
                                )}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-semibold">
                                        <Trophy className="w-5 h-5" />
                                        <span>Финальный тест курса</span>
                                    </div>
                                    {/* Previous result indicator */}
                                    {previousResult && (
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${previousResult.passed
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {previousResult.passed ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span>Ранее сдан: {previousResult.score}%</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-5 h-5" />
                                                    <span>Предыдущая попытка: {previousResult.score}%</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-indigo-50 rounded-xl px-4 py-3 text-center">
                                    <Clock className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                                    <p className="text-sm font-semibold text-indigo-900">
                                        {formatTime(timeElapsed)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600">Прогресс</span>
                                <span className="font-semibold text-indigo-600">
                                    {Object.keys(selectedAnswers).length} /{' '}
                                    {currentTest.questions.length}
                                </span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getProgressPercentage()}%` }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Questions */}
                    <div className="space-y-6">
                        <AnimatePresence>
                            {currentTest.questions.map((question, index) => (
                                <motion.div
                                    key={question.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                                >
                                    {/* Question Header */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {question.text}
                                            </h3>
                                            {question.type === 'multiple_choice' && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Выберите один вариант ответа
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Answer Options */}
                                    <div className="space-y-3">
                                        {question.answers.map((answer) => {
                                            const isSelected =
                                                selectedAnswers[question.id] === answer.id;
                                            return (
                                                <motion.label
                                                    key={answer.id}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected
                                                        ? 'border-indigo-500 bg-indigo-50'
                                                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={question.id}
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            handleAnswerSelect(
                                                                question.id,
                                                                answer.id
                                                            )
                                                        }
                                                        className="w-5 h-5 accent-indigo-600"
                                                    />
                                                    <span
                                                        className={`flex-1 ${isSelected
                                                            ? 'text-indigo-900 font-semibold'
                                                            : 'text-gray-700'
                                                            }`}
                                                    >
                                                        {answer.text}
                                                    </span>
                                                    {isSelected && (
                                                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                                                    )}
                                                </motion.label>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="sticky bottom-6 mt-8"
                    >
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(selectedAnswers).length === 0}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Завершить финальный тест
                        </button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default CourseTestPage;
