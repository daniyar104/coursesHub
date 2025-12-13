import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface LessonCompletionProps {
    isCompleted: boolean;
    isLoading: boolean;
    hasVideo: boolean;
    videoDuration: number; // in seconds
    onComplete: () => void;
}

const LessonCompletion: React.FC<LessonCompletionProps> = ({
    isCompleted,
    isLoading,
    hasVideo,
    videoDuration,
    onComplete,
}) => {
    const [timeLeft, setTimeLeft] = useState(hasVideo ? videoDuration : 0);
    const [canComplete, setCanComplete] = useState(!hasVideo || isCompleted);

    // Reset state when lesson/video changes
    useEffect(() => {
        if (isCompleted) {
            setCanComplete(true);
            setTimeLeft(0);
            return;
        }

        if (hasVideo && videoDuration > 0) {
            setTimeLeft(videoDuration);
            setCanComplete(false);
        } else {
            setCanComplete(true);
            setTimeLeft(0);
        }
    }, [hasVideo, videoDuration, isCompleted]);

    // Timer countdown
    useEffect(() => {
        if (!hasVideo || isCompleted || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setCanComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [hasVideo, isCompleted, timeLeft]);

    // Derived state for processing
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const progress = hasVideo && videoDuration > 0
        ? ((videoDuration - timeLeft) / videoDuration)
        : 1;
    const dashOffset = circumference * (1 - progress);

    // 1. Completed State
    if (isCompleted) {
        return (
            <div className="w-full mb-20 flex justify-end">
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full cursor-default border border-green-200">
                    <CheckCircle className="w-5 h-5" />
                    <span>Урок пройден</span>
                </div>
            </div>
        );
    }

    // 2. Timer/Waiting State
    if (!canComplete && hasVideo) {
        return (
            <div className="w-full mb-20 flex justify-end items-center gap-4">
                <div className="flex flex-col items-end text-sm text-gray-500">
                    <span>Чтобы завершить урок,</span>
                    <span>посмотрите видео</span>
                </div>
                <div className="relative flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="transform -rotate-90 w-14 h-14">
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-gray-200"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            className="text-indigo-600 transition-all duration-1000 ease-linear"
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* Center Text/Icon */}
                    <div className="absolute text-xs font-bold text-indigo-700">
                        {timeLeft > 60 ? `${Math.ceil(timeLeft / 60)}м` : `${timeLeft}с`}
                    </div>
                </div>
            </div>
        );
    }

    // 3. Ready to Complete State
    return (
        <Button
            variant="none"
            className="w-full mb-20 py-4 text-xl font-bold bg-[#5344B6] hover:bg-[#312679] text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-3 transform hover:scale-[1.01]"
            onClick={onComplete}
            loading={isLoading}
            disabled={isLoading}
        >
            <span>Отметить урок как выполненный</span>
            <CheckCircle className="w-6 h-6" />
        </Button>
    );
};

export default LessonCompletion;
