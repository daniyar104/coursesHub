import React, { useState } from 'react';
import {
    Menu,
    X,
    ArrowRight,
    BookOpen,
    Star,
    CheckCircle,
    Instagram,
    Twitter,
    Linkedin,
    ChevronRight,
} from 'lucide-react';
import Header from '../../components/Header/WelcomeHeader';
import { useNavigate } from 'react-router-dom';

// --- ТИПЫ ДАННЫХ ---
interface Article {
    title: string;
    image: string;
    alt: string;
    description: string;
}

interface Testimonial {
    name: string;
    role: string;
    image: string;
    quote: string;
}

// --- КОНСТАНТЫ ---
const PRIMARY_COLOR = 'text-[#5F52F8]';
const BG_PRIMARY = 'bg-[#5F52F8]';
const BORDER_PRIMARY = 'border-[#5F52F8]';

const articles: Article[] = [
    {
        title: 'Учитесь новым навыкам',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
        alt: 'Online learning concept',
        description: 'Доступ к курсам с любого устройства в любое время. Учитесь в своем темпе.',
    },
    {
        title: 'Курсы от экспертов',
        image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80',
        alt: 'Woman learning online',
        description:
            'Актуальные знания и практические навыки для вашего развития от лучших менторов.',
    },
    {
        title: 'Карьерный рост',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Professional development',
        description: 'Курсы для повышения квалификации. Получите навыки, востребованные на рынке.',
    },
];

const testimonials: Testimonial[] = [
    {
        name: 'Анна Петрова',
        role: 'Студентка',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        quote: 'Благодаря платформе я смогла получить новые навыки, не выходя из дома. Очень удобно!',
    },
    {
        name: 'Михаил Иванов',
        role: 'Преподаватель',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        quote: 'Создание курсов здесь — это удовольствие. Я могу сосредоточиться на контенте.',
    },
    {
        name: 'Елена Соколова',
        role: 'HR-менеджер',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
        quote: 'Мы используем эту платформу для обучения сотрудников. Эффективность выросла в разы.',
    },
];

// --- КОМПОНЕНТЫ ---

// 2. MAIN SECTION (Hero)
const MainSection = () => {
    const navigate = useNavigate();
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Декоративный фон */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-[#5F52F8]/5 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                {/* Левая часть: Текст */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5F52F8]/10 text-[#5F52F8] text-xs font-bold uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span
                                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${BG_PRIMARY} opacity-75`}
                            ></span>
                            <span
                                className={`relative inline-flex rounded-full h-2 w-2 ${BG_PRIMARY}`}
                            ></span>
                        </span>
                        Набор открыт 2024
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                        Инвестируйте в свое <br />
                        <span
                            className={`text-transparent bg-clip-text bg-gradient-to-r from-[#5F52F8] to-indigo-400`}
                        >
                            будущее сегодня
                        </span>
                    </h1>

                    <p className="text-lg text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Получите доступ к лучшим университетским программам. Учитесь у экспертов
                        мирового уровня в удобном для вас темпе.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button
                            onClick={() => {
                                navigate('/login');
                            }}
                            className={`${BG_PRIMARY} hover:bg-[#4d41d6] text-white px-8 cursor-pointer py-4 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-[#5F52F8]/25 flex items-center justify-center gap-2 group`}
                        >
                            Начать обучение
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                    </div>

                    <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                                >
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt="avatar"
                                    />
                                </div>
                            ))}
                        </div>
                        <p>
                            <span className="font-bold text-gray-900">1,200+</span> студентов уже с
                            нами
                        </p>
                    </div>
                </div>

                {/* Правая часть: Изображение */}
                <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                    <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 ease-out border-8 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
                            alt="Students"
                            className="w-full h-auto object-cover transition-all duration-700"
                        />
                        {/* Плашка поверх фото */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                            <div
                                className={`w-12 h-12 rounded-full ${BG_PRIMARY}/10 flex items-center justify-center ${PRIMARY_COLOR}`}
                            >
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Сертифицировано</p>
                                <p className="text-xs text-gray-500">
                                    Международный стандарт обучения
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 3. CASES SECTION
const CasesSection = ({ articles }: { articles: Article[] }) => {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                            Направления обучения
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Мы предоставляем инструменты и знания, необходимые для достижения успеха
                            в современном цифровом мире.
                        </p>
                    </div>
                    <a
                        href="#"
                        className={`hidden md:flex items-center gap-2 font-semibold ${PRIMARY_COLOR} hover:opacity-80 transition-opacity`}
                    >
                        Все курсы <ArrowRight size={20} />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                                <img
                                    src={article.image}
                                    alt={article.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                                    Популярное
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5F52F8] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                                    {article.description}
                                </p>
                                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                        8 недель
                                    </span>
                                    <button
                                        className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:${BG_PRIMARY} group-hover:text-white transition-colors`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden flex justify-center">
                    <a
                        href="#"
                        className={`flex items-center gap-2 font-semibold ${PRIMARY_COLOR}`}
                    >
                        Все курсы <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

// 4. TESTIMONIALS SECTION (Бонус)
const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
                    Что говорят студенты
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill="currentColor"
                                        className="text-yellow-400"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-50"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                                    <p className={`text-sm ${PRIMARY_COLOR} font-medium`}>
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 5. FOOTER
const Footer = () => {
    return (
        <footer className="bg-[#1a1b2e] text-white pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-lg ${BG_PRIMARY} flex items-center justify-center text-white`}
                            >
                                <BookOpen size={18} />
                            </div>

                            <span className="font-bold text-xl tracking-tight">CourseHUB</span>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Платформа для тех, кто хочет учиться новому и развиваться каждый день.
                            Доступное образование для каждого.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5F52F8] transition-colors"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Платформа</h4>
                        <ul className="space-y-4 text-gray-400">
                            {['Все курсы', 'Тарифы', 'FAQ', 'Для бизнеса'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-[#5F52F8] transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Компания</h4>
                        <ul className="space-y-4 text-gray-400">
                            {['О нас', 'Карьера', 'Блог', 'Контакты'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-[#5F52F8] transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2025 Astana International Univercity. Все права защищены.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            Политика конфиденциальности
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Условия использования
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- ГЛАВНАЯ СТРАНИЦА ---
export default function WelcomePage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#5F52F8] selection:text-white">
            <Header />
            <main className="flex-grow">
                <MainSection />
                <CasesSection articles={articles} />
                <TestimonialsSection testimonials={testimonials} />
            </main>
            <Footer />
        </div>
    );
}
