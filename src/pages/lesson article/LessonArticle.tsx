import Header from "../../components/Header/HomeHeader";
import Arrow from "../../../assets/icon/Arrow.svg";
import Player from "../../../assets/images/empty_player.jpg";
import { Clock, User } from "lucide-react";
import Divider from "../../components/ui/Divider/Divider";
import Button from "../../components/ui/Button";
import { useState } from "react";
import Description from "./tab/Description";

export default function LessonArticle() {
    const [active, setActive] = useState("description");
    const handleClick = (el: string) => {
        setActive(el);
    };
    return (
        <>
            <Header />

            {/* контейнер */}
            <div className="relative max-w-[1350px] w-[90%] mx-auto min-h-screen shadow-xl pt-25 overflow-x-hidden">
                {/* Внутрений Хэдэр на всю ширину */}
                <div className="w-full min-h-16 bg-[#3F3F8F]/10 px-7 py-3 flex items-center justify-between">
                    <button className="relative max-w-60 w-full min-w-30 min-h-15 rounded-[200px] cursor-pointer bg-[#3F3F8F] text-white text-base group">
                        <div className="absolute w-15 h-15 rounded-full bg-[#5F52F8] top-0 left-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                            <img
                                src={Arrow}
                                alt="Arrow icon"
                                className="w-full h-full max-w-7 rotate-180"
                            />
                        </div>
                        Вернуться
                    </button>

                    <h3 className="text-2xl text-center uppercase flex-1 max-w-[700px]  text-[#4D5756]">
                        Web-разработка
                    </h3>

                    <div>Фокус Мод(нету пока)</div>
                </div>

                {/* Контент */}
                <div className="w-[90%] max-w-[1230px] mx-auto mt-25 flex flex-col items-start gap-6">
                    {/* Проыйгрыватель */}

                    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[700px] bg-gray-300 overflow-hidden rounded-[50px]">
                        <div className="absolute inset-0 bg-[#0E2A46]/30"></div>
                        <img
                            src={Player}
                            alt="Player"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Боковая панель с уроками */}
                    <aside className="w-130 h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[700px] absolute md:left-[calc(100%-40px)] left-[calc(100%-20px)] hover:left-[calc(100%-520px)] transition-all duration-300">
                        <div className="w-full h-full flex bg-[#3F3F8F] rounded-l-[40px]">
                            <div className="w-[35px] h-full flex items-center justify-center">
                                <svg
                                    width="15"
                                    height="20"
                                    viewBox="0 0 7 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.75 12.75L0.75 6.75L5.75 0.75003"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </aside>

                    <h3 className="text-5xl text-[#0E2A46] leading-[120%] font-bold capitalize">
                        Знакомство с основами HTML
                    </h3>

                    <div className="flex max-w-full gap-5">
                        <div className="flex items-center gap-1">
                            <Clock size={20} color="#3F3F8F" />
                            <p className="text-xl">
                                Продолжительность урока
                                <span className="font-bold"> 17m 23s</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            <User size={20} color="#3F3F8F" />
                            <p className="text-xl">
                                Students
                                <span className="font-bold"> 20+</span>
                            </p>
                        </div>
                    </div>

                    <Divider className="w-full" thickness="2px" />

                    <div className="flex gap-5">
                        <Button
                            children={"Описание"}
                            variant="none"
                            className={`cursor-pointer text-xl ${
                                active === "description"
                                    ? "bg-[#5344B6] text-white hover:bg-[#312679]"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => {
                                handleClick("description");
                            }}
                        />
                        <Button
                            children={"Практика"}
                            variant="none"
                            className={`cursor-pointer text-xl ${
                                active === "practice"
                                    ? "bg-[#5344B6] text-white hover:bg-[#312679]"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => {
                                handleClick("practice");
                            }}
                        />
                        <Button
                            children={"Преподователь"}
                            variant="none"
                            className={`cursor-pointer text-xl ${
                                active === "teachers"
                                    ? "bg-[#5344B6] text-white hover:bg-[#312679]"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => {
                                handleClick("teachers");
                            }}
                        />
                        <Button
                            children={"Отзывы"}
                            variant="none"
                            className={`cursor-pointer text-xl ${
                                active === "review"
                                    ? "bg-[#5344B6] text-white hover:bg-[#312679]"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => {
                                handleClick("review");
                            }}
                        />
                    </div>

                    {active == "description" ? <Description /> : null}
                </div>
            </div>
        </>
    );
}
