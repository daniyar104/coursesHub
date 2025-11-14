import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Slider() {
    const slides = [
        "bg-red-500",
        "bg-blue-400",
        "bg-purple-400",
        "bg-green-500",
    ];
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden min-h-[300px]">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((color, idx) => (
                    <div
                        key={idx}
                        className={`min-w-full min-h-[300px] ${color}`}
                    ></div>
                ))}
            </div>

            {/* Кнопки */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4">
                <button
                    onClick={prevSlide}
                    className="bg-white hover:bg-gray-300 text-white p-2 rounded-full cursor-pointer"
                >
                    <ChevronRight
                        color="black"
                        className="rotate-180 -translate-x-0.5"
                    />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white hover:bg-gray-300 text-white p-2 rounded-full cursor-pointer"
                >
                    <ChevronRight color="black" className="translate-x-0.5" />
                </button>
            </div>
        </div>
    );
}
