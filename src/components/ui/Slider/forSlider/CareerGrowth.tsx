import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Компонент плавающей иконки (можно вынести в отдельный файл)
interface FloatingBoxProps {
    colorClass: string;
    delay?: number;
    className?: string;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({ colorClass, delay = 0, className = '' }) => (
    <motion.div
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl shadow-lg flex items-center justify-center ${colorClass} ${className}`}
        animate={{
            y: [0, 15, 0],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay,
        }}
    ></motion.div>
);

export default function CareerGrowthSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <div className="bg-emerald-900 text-white max-h-[400px] overflow-hidden px-6 sm:px-12 flex flex-col lg:flex-row items-center gap-10 relative">
                {/* Левый блок с текстом */}
                <div className="flex-1 flex flex-col justify-center py-10 z-10">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2">
                        Новые возможности
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-2 leading-[1.3]">
                        Ускорьте свой <br />
                        <span className="text-emerald-400">карьерный рост</span>
                    </h2>
                    <p className="text-emerald-100/80 mb-8 text-lg max-w-lg">
                        Присоединяйтесь к сообществу профессионалов, находите менторов и открывайте
                        доступ к эксклюзивным вакансиям в ведущих IT-компаниях.
                    </p>

                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={() => navigate('/community')}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-900/50 transition-all transform hover:scale-105"
                        >
                            Вступить в комьюнити
                        </button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/20 transition">
                            Смотреть вакансии
                        </button>
                    </div>
                </div>

                {/* Правый блок с изображением и элементами */}
                <div className="flex-1 justify-center self-end relative w-full h-full min-h-[300px] hidden md:flex">
                    <div className="relative z-10 w-full max-w-[400px]">
                        <img
                            src="https://postupi.kg/uploads/images/cr74q12kLJypx82gd9JRLSiF-1080.png" // Можно заменить на фото человека в костюме/офисе
                            alt="Карьерный рост"
                            className="w-full h-auto object-contain brightness-110 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))' }}
                        />
                    </div>

                    {/* Декоративные анимированные боксы */}
                    <FloatingBox colorClass="bg-emerald-400 absolute top-10 left-10" delay={0} />
                    <FloatingBox colorClass="bg-blue-500 absolute top-1/2 right-0" delay={1} />
                    <FloatingBox colorClass="bg-amber-400 absolute bottom-20 left-0" delay={0.5} />

                    {/* Фоновое свечение */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/30 blur-[100px] rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
