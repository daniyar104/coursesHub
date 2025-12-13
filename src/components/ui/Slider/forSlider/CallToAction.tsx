import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface IconBoxProps {
    colorClass: string;
    delay?: number;
}

const IconBox: React.FC<IconBoxProps> = ({ colorClass, delay = 0 }) => (
    <motion.div
        className={`w-16 h-16 sm:w-20 sm:h-20 p-4 sm:p-6 rounded-3xl shadow-xl flex items-center justify-center ${colorClass}`}
        animate={{ y: [0, -10, 0] }} // движение вверх-вниз
        transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay,
        }}
    ></motion.div>
);

export default function CallToActionSection() {
    const navigate = useNavigate();
    return (
        <div className="w-full max-h-100 h-full">
            <div className="bg-indigo-700 text-white overflow-hidden px-10 flex flex-col lg:flex-row items-center lg:items-stretch gap-8 relative min-h-[400px]">
                {/* Левый блок с текстом */}
                <div className="flex-1 flex flex-col justify-center p-5">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Изучайте навыки для будущего уже сегодня
                    </h2>
                    <p className="text-white/80 mb-6">
                        Отрабатывайте навыки работы с ИИ, профессиональные и жизненные навыки с
                        помощью самых актуальных материалов от экспертов по обучению.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={() => {
                                navigate('/course/CRS1763819786238');
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
                        >
                            Начните действовать
                        </button>
                        <button className="border-2 border-white text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/10 transition">
                            Изучайте ИИ
                        </button>
                    </div>
                </div>

                {/* Правый блок с изображением и иконками */}
                <div className="flex-1 flex justify-end self-end items-center pl-3 relative max-w-[400px] h-full">
                    <img
                        src="https://postupi.kg/uploads/images/cr74q12kLJypx82gd9JRLSiF-1080.png"
                        alt="Эксперт по обучению"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                                'https://placehold.co/400x400/4C0D7F/ffffff?text=Image+Error';
                        }}
                    />
                    {/* Иконки с анимацией */}
                    <IconBox colorClass="bg-red-500 absolute top-0 right-4" delay={0.2} />
                    <IconBox colorClass="bg-yellow-500 absolute bottom-0 left-4" delay={0.4} />
                    <IconBox colorClass="bg-teal-500 absolute bottom-1/4 right-8" delay={0.6} />
                </div>
            </div>
        </div>
    );
}
