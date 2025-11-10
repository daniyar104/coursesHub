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
        <section>
            <div className="w-full min-h-screen bg-gray-900 relative">
                <div className="max-w-7xl mx-auto pt-20 lg:pt-40">
                    <h1
                        className="text-white text-4xl lg:text-7xl font-bold text-center"
                        data-aos="fade-up"
                    >
                        Что вы создадите?
                    </h1>
                    <p
                        className="text-gray-400 text-center text-xl mt-12"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Исследуйте наши курсы и начните обучение уже сегодня!
                    </p>
                    <div className="mx-auto pt-24 flex flex-wrap justify-around">
                        {articles.map((a, i) => (
                            <div
                                key={i}
                                className="xl:w-1/3 sm:w-5/12 sm:max-w-xs mb-32 lg:mb-20 xl:max-w-sm lg:w-1/2 w-11/12 mx-auto sm:mx-0 hover:scale-105 transition-transform duration-300 flex flex-col"
                                data-aos="fade-up"
                                data-aos-delay={i * 200}
                            >
                                <div className="h-64">
                                    <img
                                        src={a.image}
                                        alt={a.alt}
                                        className="h-full w-full object-cover rounded"
                                    />
                                </div>
                                <div className="p-4 shadow-lg bg-white rounded-b flex flex-col justify-between">
                                    <p className="text-gray-900 font-bold text-center text-lg">
                                        {a.title}
                                    </p>
                                    <p className="text-gray-500 text-center text-sm">
                                        {a.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
