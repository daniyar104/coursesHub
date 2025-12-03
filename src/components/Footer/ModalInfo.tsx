import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    photo: string; // URL
}
interface TeamGroupItem {
    label: string;
    trueLabel: string;
    member: TeamMember[];
}

interface TeamGroup {
    developer: TeamGroupItem;
    dataBase: TeamGroupItem;
    designer: TeamGroupItem;
    tester: TeamGroupItem;
}

const TEAM: TeamGroup = {
    developer: {
        trueLabel: "Разработчики",
        label: "«Создатели багов»",
        member: [
            {
                name: "Темиров Данияр",
                role: "Team Lead / Full-stack",
                photo: "",
            },
            { name: "Тлеулин Асылхан", role: "Web-developer", photo: "" },
            {
                name: "Токтар Айдын",
                role: "Developer, но сам об этом незнает",
                photo: "",
            },
        ],
    },
    dataBase: {
        trueLabel: "База Данных",
        label: "«Хранитель священных таблиц»",
        member: [
            {
                name: "Сериков Мирас",
                role: "Database Administrator",
                photo: "",
            },
        ],
    },
    designer: {
        trueLabel: "Дизайнеры",
        label: "«Повелители кривых макетов»",
        member: [
            {
                name: "Құрманғазин Еламан",
                role: "Главный Дизайнер",
                photo: "",
            },
            {
                name: "Асланұлы Арыстан",
                role: "Тоже Главный Дизайнер",
                photo: "",
            },
            {
                name: "Тлеуберген Бағұстар",
                role: "Главный Главный Дизайнер",
                photo: "",
            },
        ],
    },
    tester: {
        trueLabel: "QA-Тестеры",
        label: "«Палачи фичей»",
        member: [
            {
                name: "Сәрсембай  Дидар",
                role: "Тестировщик",
                photo: "",
            },
            {
                name: "Достаев Наиль",
                role: "Тестировал тесты Дидара",
                photo: "",
            },
            {
                name: "Шамутов Дамир",
                role: "Тестировал тесты Наиля",
                photo: "",
            },
        ],
    },
};

export default function ModalInfo() {
    const [open, setOpen] = useState(false);
    const [keys, setKeys] = useState<string[]>([]);

    // Секретная комбинация
    const secret = ["KeyQ", "KeyW", "KeyE"]; // пример

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            setKeys((prev) => [...prev.slice(-2), e.code]);
        };

        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (secret.every((k, i) => keys[i] === k)) setOpen(true);
    }, [keys]);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2/3 max-h-[700px] overflow-y-auto flex flex-col gap-10"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Над проектом работала группа
                                        <strong> ВТ-23Б Типо</strong>
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Мы старались!
                                    </p>
                                </div>
                                <button
                                    className="p-2 rounded-full bg-white hover:bg-gray-200 cursor-pointer duration-300"
                                    onClick={() => setOpen(false)}
                                >
                                    <X />
                                </button>
                            </div>

                            {Object.entries(TEAM).map(
                                ([groupName, groupValue]: [
                                    string,
                                    TeamGroupItem
                                ]) => (
                                    <div
                                        className="flex flex-col gap-5"
                                        key={groupName}
                                    >
                                        <div>
                                            <h3 className="font-bold text-2xl">
                                                {groupValue.trueLabel}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {groupValue.label}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            {groupValue.member.map(
                                                (el, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-gray-100 rounded-xl p-4 text-center"
                                                    >
                                                        <img
                                                            src={el.photo}
                                                            className="w-28 h-28 object-cover rounded-full mx-auto mb-3"
                                                        />
                                                        <h3 className="text-xl font-semibold">
                                                            {el.name}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {el.role}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="grid grid-cols-4 gap-4">
                                {/* {TEAM.map((p) => (
                                    <div
                                        key={p.name}
                                        className="bg-gray-100 rounded-xl p-4 text-center"
                                    >
                                        <img
                                            src={p.photo}
                                            className="w-28 h-28 object-cover rounded-full mx-auto mb-3"
                                        />
                                        <h3 className="text-xl font-semibold">
                                            {p.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {p.role}
                                        </p>
                                    </div>
                                ))} */}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
