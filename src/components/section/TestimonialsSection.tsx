type Testimonials = {
    name: string;
    role: string;
    quote: string;
    image: string;
};

interface TestimonialsProps {
    testimonials: Testimonials[];
}

export default function TestimonialsSection({
    testimonials,
}: TestimonialsProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2
                        className="text-4xl font-bold text-gray-900"
                        data-aos="fade-up"
                    >
                        Отзывы наших пользователей
                    </h2>
                    <p
                        className="mt-4 text-xl text-gray-500"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Узнайте, что говорят о нас те, кто уже использует
                        CourseHub
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 rounded-lg shadow-md"
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                        >
                            <div className="flex items-center mb-6">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="h-16 w-16 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {t.name}
                                    </h3>
                                    <p className="text-gray-500">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{t.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
