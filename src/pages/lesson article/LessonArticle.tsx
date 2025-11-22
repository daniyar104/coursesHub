import Header from "../../components/Header/HomeHeader";
import Arrow from "../../../assets/icon/Arrow.svg";
import { Clock, User } from "lucide-react";
import Divider from "../../components/ui/Divider/Divider";
import Button from "../../components/ui/Button";
import { useRef, useState } from "react";
import Description from "./tab/Description";
import { useNavigate } from "react-router-dom";
import Practice from "./tab/Practice";
import TeacherProfile from "./tab/TeacherProfile";
import Footer from "../../components/Footer/FooterLesson";
import ModulePanel from "./components/ModulePanel";
import VideoPlayer, {
    type VideoPlayerHandle,
} from "../../components/ui/VideoPlayer/VideoPlayer";
import TimecodeList from "../../components/ui/VideoPlayer/TimeCodeList";

export default function LessonArticle() {
    const [activeTab, setActiveTab] = useState("description");
    const handleClick = (el: string) => {
        setActiveTab(el);
    };

    const playerRef = useRef<VideoPlayerHandle>(null);

    const lessonTimecodes = [
        { label: "Вступление", time: 0 },
        { label: "Глава 1: Основы", time: 15 },
        { label: "Глава 2: Практика", time: 120 },
    ];

    const handleTimecodeSelect = (time: number) => {
        // Обращаемся к методу seekTo внутри VideoPlayer
        playerRef.current?.seekTo(time);
    };

    const courseData = {
        modules: [
            {
                id: "MOD1763819794148",
                title: "Введение",
                lessons: [
                    {
                        id: "LSN1763820309006",
                        title: "Что такое HTML",
                        material_url:
                            "https://sdwhgpvdfjbvkoqhipyd.supabase.co/storage/v1/object/public/materials/1763821690731_owm3ld.pdf",
                    },
                    {
                        id: "LSN1763826786460",
                        title: "VSCode Что это такое и с чем его едят?",
                        material_url:
                            "https://sdwhgpvdfjbvkoqhipyd.supabase.co/storage/v1/object/public/materials/1763826800588_j5pyi.pdf",
                    },
                ],
            },
            {
                id: "MOD1763826657730",
                title: "Что такое HTML?",
                lessons: [
                    {
                        id: "LSN1763826681526",
                        title: "Создаем новый файл и открываем его в браузере",
                        material_url: null,
                    },
                ],
            },
        ],
    };

    const navigate = useNavigate();
    return (
        <>
            {/* <Header /> */}

            {/* контейнер */}
            <div className="relative max-w-[1550px] w-[90%] mx-auto min-h-screen shadow-xl overflow-x-hidden">
                {/* Внутрений Хэдэр на всю ширину */}
                <div className="w-full min-h-16 bg-[#3F3F8F]/10 px-7 py-3 flex items-center justify-between">
                    <button
                        onClick={() => {
                            navigate("/home");
                        }}
                        className="relative max-w-60 w-full min-w-30 min-h-15 rounded-[200px] cursor-pointer bg-[#3F3F8F] text-white text-base group"
                    >
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
                <div className="w-[90%] max-w-[1230px] mx-auto mt-5 flex flex-col items-start gap-6">
                    {/* Проыйгрыватель */}

                    <div className="relative w-full md:h-[50vh] lg:h-[60vh] max-h-[700px] bg-gray-300 overflow-hidden rounded-[50px]">
                        <VideoPlayer
                            ref={playerRef}
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"
                            title="Урок 1. Введение в курс"
                        />
                    </div>

                    {/* Боковая панель с уроками */}
                    <ModulePanel modules={courseData.modules} />

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

                    <TimecodeList
                        items={lessonTimecodes}
                        onTimecodeClick={handleTimecodeSelect}
                    />
                    <Divider className="w-full" thickness="2px" />

                    <div className="flex gap-5">
                        <Button
                            children={"Описание"}
                            variant="none"
                            className={`cursor-pointer text-xl ${
                                activeTab === "description"
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
                                activeTab === "practice"
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
                                activeTab === "teacher"
                                    ? "bg-[#5344B6] text-white hover:bg-[#312679]"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                            }`}
                            onClick={() => {
                                handleClick("teacher");
                            }}
                        />
                    </div>

                    {activeTab == "description" ? <Description /> : null}
                    {activeTab == "practice" ? <Practice /> : null}
                </div>
                {activeTab == "teacher" ? (
                    <TeacherProfile
                        name="Каюпов Еркебулан"
                        role="Преподаватель"
                        description="Tempor orci dapibus ultrices in iaculis nunc sed augue. Feugiat in ante metus dictum at tempor commodo."
                        education={[
                            "Bachelor of Computer Science, MIT",
                            "Master in Educational Technology, Harvard",
                        ]}
                        avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
                        phone="(568) 367-987-237"
                        location="Hudson, Wisconsin(WI), 54016"
                        email="govillage@gmail.com"
                    />
                ) : null}

                <Footer />
            </div>
        </>
    );
}
