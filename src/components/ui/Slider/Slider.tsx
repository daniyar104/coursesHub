import { ChevronRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

interface SliderProps {
    elements: ReactNode[];
}
export default function Slider({ elements }: SliderProps) {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? elements.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === elements.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === elements.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden max-h-[400px] group">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {elements.map((el, idx) => (
                    <div key={idx} className="min-w-full min-h-[300px]">
                        {el}
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white hover:bg-gray-300 text-black p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition"
            >
                <ChevronRight className="rotate-180 -translate-x-0.5" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white hover:bg-gray-300 text-black p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition"
            >
                <ChevronRight className="translate-x-0.5" />
            </button>
        </div>
    );
}
