import React, { useState } from "react";
import CasesSection from "../../components/section/CasesSection";
import TestimonialsSection from "../../components/section/TestimonialsSection";
import MainSection from "../../components/section/MainSection";
import Header from "../../components/ui/Header.tsx";

const articles = [
    {
        title: "Учитесь новым навыкам из любого места.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
        alt: "Online learning concept",
        description:
            "Доступ к курсам с любого устройства в любое время. Учитесь в своем темпе и по своему расписанию.",
    },
    {
        title: "Улучшите свои знания с лучшими курсами.",
        image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=80",
        alt: "Woman learning online",
        description:
            "Курсы от экспертов в различных областях. Актуальные знания и практические навыки для вашего развития.",
    },
    {
        title: "Развивайте карьеру с профессиональными курсами.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
        alt: "Professional development",
        description:
            "Курсы для повышения квалификации и карьерного роста. Получите навыки, востребованные на рынке труда.",
    },
];

const testimonials = [
    {
        name: "Анна Петрова",
        role: "Студентка",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        quote: "Благодаря CourseHub я смогла получить новые навыки, не выходя из дома. Платформа очень удобная и интуитивно понятная.",
    },
    {
        name: "Михаил Иванов",
        role: "Преподаватель",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        quote: "Создание курсов на CourseHub — это удовольствие. Я могу сосредоточиться на содержании, а не на технических деталях.",
    },
    {
        name: "Елена Соколова",
        role: "HR-менеджер",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
        quote: "Мы используем CourseHub для обучения наших сотрудников. Это значительно повысило эффективность нашего обучения.",
    },
];

export default function WelcomePage() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.includes("@")) {
            setIsSubscribed(true);
            setEmail("");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Навигация */}
            <Header />
            {/* Hero */}
            <MainSection />
            <CasesSection articles={articles} />
            <TestimonialsSection testimonials={testimonials} />

            <footer
                id="contacts"
                className="bg-white border-t border-gray-300 py-10"
            >
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <img
                        src="https://s.iimg.su/s/18/tnTIrX67MXOrt2Juc7Bp1KZvnBq9ObwnQrCj32oE.png"
                        alt="logo"
                        className="mx-auto w-12 h-12 mb-4"
                    />
                    <h4 className="text-lg font-semibold mb-3">
                        Подписка на новости
                    </h4>
                    {isSubscribed ? (
                        <p className="text-green-600 font-medium">
                            Спасибо за подписку!
                        </p>
                    ) : (
                        <form
                            onSubmit={handleSubscribe}
                            className="flex justify-center gap-2"
                        >
                            <input
                                type="email"
                                placeholder="Ваш email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border px-3 py-2 rounded w-64"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Подписаться
                            </button>
                        </form>
                    )}
                </div>
            </footer>
        </div>
    );
}
