type Article = {
    image: string;
    alt: string;
    title: string;
    description: string;
};

interface CasesSectionProps {
    articles: Article[];
}

export default function CasesSection({ articles }: CasesSectionProps) {
    return (
        <section className="bg-gray-900 text-white py-20 lg:py-40 relative">
            <div className="max-w-7xl mx-auto px-4">
                <h1
                    className="text-4xl lg:text-6xl font-bold text-center"
                    data-aos="fade-up"
                >
                    Что вы создадите?
                </h1>
                <p
                    className="text-gray-400 text-center text-lg lg:text-xl mt-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Исследуйте наши курсы и начните обучение уже сегодня!
                </p>

                <div
                    className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {articles.map((a, i) => (
                        <div
                            key={i}
                            className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col"
                            data-aos="fade-up"
                            data-aos-delay={i * 150}
                        >
                            <div className="h-56 sm:h-64">
                                <img
                                    src={a.image}
                                    alt={a.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between text-center">
                                <h3 className="text-gray-900 font-semibold text-lg mb-2">
                                    {a.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {a.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
