import { type ReactNode } from "react";

interface CoursesSectionProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    cards: ReactNode[];
    onLoadMore?: () => void;
}

export default function CoursesSection({
    badge = "TOP POPULAR COURSE",
    title = "Edunity Course Student Can Join With Us.",
    subtitle = "",
    cards,
    onLoadMore,
}: CoursesSectionProps) {
    return (
        <section className="py-16 bg-linear-to-b from-white to-violet-50">
            <div className="max-w-[1300px] w-[90%] mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        {badge && (
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-violet-600 bg-violet-100">
                                {badge}
                            </div>
                        )}

                        <h2 className="mt-4 text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                            {title}
                        </h2>

                        {subtitle && (
                            <p className="mt-4 text-sm text-slate-500 max-w-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="shrink-0 mt-3 lg:mt-0">
                        <button
                            onClick={onLoadMore}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-violet-600 text-white font-medium shadow-md hover:opacity-95"
                        >
                            Load More Course
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="p-2 rounded-lg border-2 border-dashed border-violet-200 bg-white"
                            >
                                {card}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
