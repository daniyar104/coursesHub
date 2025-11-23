import { ChevronRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

interface SliderProps {
    elements: ReactNode[];
    isPresent?: boolean; // true — для презентаций (компоненты), false — для изображений
    autoPlayInterval?: number; // интервал автопрокрутки
}

export default function Slider({
    elements,
    isPresent,
    autoPlayInterval = 5000,
}: SliderProps) {
    const [current, setCurrent] = useState(0);

    if (!elements.length) return null;

    const prevSlide = () =>
        setCurrent((prev) => (prev === 0 ? elements.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrent((prev) => (prev === elements.length - 1 ? 0 : prev + 1));

    useEffect(() => {
        if (elements.length < 2 || isPresent) return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [elements.length, isPresent, autoPlayInterval]);

    return (
        <div className="relative w-full overflow-hidden h-full group">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {elements.map((el, idx) => (
                    <div
                        key={idx}
                        className="min-w-full min-h-[300px] flex items-center justify-center"
                    >
                        {isPresent ? (
                            <img
                                src={el as string}
                                alt="Slide"
                                loading="lazy"
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            el
                        )}
                    </div>
                ))}
            </div>

            {elements.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white hover:bg-gray-300 text-black p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition"
                    >
                        <ChevronRight className="rotate-180" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white hover:bg-gray-300 text-black p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition"
                    >
                        <ChevronRight />
                    </button>
                </>
            )}
            {isPresent ? (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition">{`${
                    current + 1
                }/${elements.length}`}</div>
            ) : (
                <></>
            )}
        </div>
    );
}
