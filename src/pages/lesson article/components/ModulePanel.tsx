import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { Lesson } from "../../../service/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Пример props
interface Lesson {
    id: string;
    title: string;
    material_url: string | null;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}
interface ModulePanelProps {
    modules: Module[];
    courseId: string;
}

export default function ModulePanel({ modules, courseId }: ModulePanelProps) {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [activeModule, setActiveModule] = useState<number | null>(null);
    const navigate = useNavigate();

    return (
        <>
            <div
                className={`fixed inset-0 bg-black z-10 transition-opacity duration-300 ${active ? "opacity-30" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setActive(false)}
            />

            {/* Боковая панель с Модулями и уроками */}
            <aside
                style={{ left: active ? "calc(100% - 520px)" : undefined }}
                className={`w-130  md:h-[50vh] lg:h-[60vh] z-100 max-h-[700px] absolute md:left-[calc(100%-40px)] left-[calc(100%-20px)] transition-all duration-300 cursor-pointer`}
                onClick={() => {
                    setActive(true);
                }}
            >
                <div className="w-full h-full flex bg-[#3F3F8F] rounded-l-[40px]">
                    <div className="w-[35px] h-full flex items-center justify-center ">
                        <ChevronLeft
                            color="white"
                            className={`${active ? "rotate-180" : ""
                                } transition-all duration-700`}
                        />
                    </div>

                    {/* Список модулей */}
                    <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto">
                        {modules.map((mod, i) => (
                            <div key={mod.id} className="">
                                <div
                                    onClick={() => {
                                        setActiveModule(
                                            activeModule === i ? null : i
                                        );
                                    }}
                                    className="flex flex-col w-full bg-white border border-[#D9D9D9] rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                    {/* Верхняя строка */}
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-white flex items-center justify-center w-10 h-10 rounded-full bg-[#3F3F8F]">
                                                {i + 1}
                                            </span>

                                            <span className="text-lg font-semibold text-[#3F3F8F]">
                                                {mod.title}
                                            </span>
                                        </div>

                                        <ChevronLeft
                                            color="#3F3F8F"
                                            className={`${activeModule === i
                                                ? "rotate-90"
                                                : "rotate-270"
                                                } transition-all duration-300`}
                                        />
                                    </div>

                                    {/* Выпадающая часть */}
                                    <motion.div
                                        animate={{
                                            height:
                                                activeModule === i ? "auto" : 0,
                                            opacity: activeModule === i ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 pt-1 text-sm text-[#3F3F8F] space-y-2">
                                            {mod.lessons.map(
                                                (lesson, lessonIndex) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center gap-2 p-2 rounded-lg bg-[#F3F3FF] border border-[#E5E5F3] group"
                                                        onClick={() => {
                                                            navigate(
                                                                `/course/${courseId}/lesson/${lesson.id}`
                                                            );
                                                        }}
                                                    >
                                                        <span className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-300 group-hover:bg-[#3F3F8F] group-hover:text-white duration-200">
                                                            {lessonIndex + 1}
                                                        </span>
                                                        {lesson.title}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}
