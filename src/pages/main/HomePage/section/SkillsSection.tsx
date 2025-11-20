const cards = [
    {
        title: "Генеративный ИИ",
        users: "1,7 млн+",
        img: "https://t3.ftcdn.net/jpg/09/81/65/06/360_F_981650618_Rs30eAZHDukqNiFhSZzPpNpYTF1I3yYp.jpg",
    },
    {
        title: "ИТ-сертификация",
        users: "14 млн+",
        img: "https://pic.rutubelist.ru/playlist/cccef531-e5e5-11ef-9b90-02420a00066c.jpg",
    },
    {
        title: "Обработка и анализ данных",
        users: "8,1 млн+",
        img: "https://avatars.mds.yandex.net/i?id=c3792f0beecd6d143ce49addeb2da5c7d3d0d3a0-4885784-images-thumbs&n=13",
    },
];

export default function SkillsSection() {
    return (
        <div className="w-[90%] max-w-[1320px] mx-auto my-10">
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
