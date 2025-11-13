import React from "react";

const cards = [
    {
        title: "Генеративный ИИ",
        users: "1,7 млн+",
        img: "https://images.unsplash.com/photo-1633113215932-48eaf0faef7d?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "ИТ-сертификация",
        users: "14 млн+",
        img: "https://images.unsplash.com/photo-1581090700227-95f7b2f611d6?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Обработка и анализ данных",
        users: "8,1 млн+",
        img: "https://images.unsplash.com/photo-1612832021122-6aa0fef9c2a5?auto=format&fit=crop&w=800&q=80",
    },
];

export default function CourseCarousel() {
    return (
        <div className="w-[90%] max-w-[1300px] mx-auto my-10">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col justify-start gap-5">
                    <h2 className="text-2xl font-bold mb-2">
                        Изучайте важные навыки для карьеры и жизни
                    </h2>
                    <p className="text-gray-600">
                        AiuCourse поможет вам быстро освоить актуальные навыки и
                        найти хорошую работу в изменчивом рынке труда.
                    </p>
                </div>

                <div className="md:w-2/3 flex justify-between">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="relative flex-none w-[250px] rounded-lg overflow-hidden bg-gray-100 snap-start shadow-lg"
                        >
                            <img
                                src={card.img}
                                alt={card.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-white p-4">
                                <div className="text-sm text-gray-500 mb-1">
                                    {card.users}
                                </div>
                                <div className="font-semibold">
                                    {card.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
