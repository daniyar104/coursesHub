import Header from "../../components/Header/HomeHeader";
import { Clock, Presentation, User } from "lucide-react";
import Divider from "../../components/ui/Divider/Divider";
import Button from "../../components/ui/Button";
import { useEffect, useRef, useState } from "react";
import Description from "./tab/Description";
import Practice from "./tab/Practice";
import TeacherProfile from "./tab/TeacherProfile";
import Footer from "../../components/Footer/FooterLesson";
import ModulePanel from "./components/ModulePanel";
import VideoPlayer, {
    type VideoPlayerHandle,
} from "../../components/ui/VideoPlayer/VideoPlayer";
import TimecodeList from "../../components/ui/VideoPlayer/TimeCodeList";
import ButtonLesson from "../../components/ui/Button/ButtonLesson";
import MaterialRenderer from "./components/MaterialRenderer";
import { useParams } from "react-router-dom";
import { useCoursesStore } from "../../store/coursesStore";
import durationFormat from "../../utils/durationFormat";
import Loading from "../../components/ui/Loading/Loading";

export default function LessonPage() {
    const { courseId, lessonId } = useParams<{
        courseId: string;
        lessonId: string;
    }>();

    const fetchCourseById = useCoursesStore((state) => state.fetchCourseById);
    const course = useCoursesStore((state) => state.courseDetail);
    const loading = useCoursesStore((state) => state.loading);

    useEffect(() => {
        if (courseId) fetchCourseById(courseId);
    }, [courseId]);

    const [activeTab, setActiveTab] = useState("description");
    const [videoDuration, setVideoDuration] = useState(0);

    const playerRef = useRef<VideoPlayerHandle>(null);

    if (loading) return <Loading />;

    if (!course) return <div>Курс не найден</div>;

    const lesson = course.modules
        ?.flatMap((m) => m.lessons)
        .find((l) => l.id === lessonId);

    if (!lesson) return <div>Урок не найден</div>;

    console.log(course);
    console.log(lesson);

    const lessonTimecodes = [
        { label: "Вступление", time: 0 },
        { label: "Глава 1: Основы монтажа", time: 3 }, // 2:05
        { label: "Глава 2: Цветокоррекция", time: 7 }, // 5:40
        { label: "Глава 3: Экспорт", time: 510 }, // 8:30
    ];

    const handleTimecodeSelect = (time: number) => {
        // Обращаемся к методу seekTo внутри VideoPlayer
        playerRef.current?.seekTo(time);
    };

    return (
        <>
            {/* <Header /> */}

            {/* контейнер */}
            <div className="relative max-w-[1550px] w-[90%] mx-auto min-h-screen shadow-xl overflow-x-hidden">
                {/* Внутрений Хэдэр на всю ширину */}
                <div className="w-full min-h-16 bg-[#3F3F8F]/10 px-7 py-3 flex items-center justify-between">
                    <ButtonLesson
                        text="Вернуться"
                        link={`/course/${courseId}`}
                    />

                    <h3 className="text-2xl text-center font-bold uppercase flex-1 max-w-[700px]  text-[#4D5756]">
                        {course.title}
                    </h3>

                    <div>Фокус Мод(нету пока)</div>
                </div>

                {/* Контент */}
                <div className="w-[90%] max-w-[1230px] mx-auto mt-5 flex flex-col items-start gap-6">
                    <div className="w-full h-full">
                        <MaterialRenderer
                            type={lesson.material_type}
                            title={lesson.title}
                            material_url={lesson.material_url}
                            // timecodes={lessonTimecodes}
                            onVideoDuration={setVideoDuration}
                        />
                    </div>

                    {/* Боковая панель с уроками */}
                    <ModulePanel
                        modules={course.modules}
                        courseId={course.id}
                    />

                    <h3 className="text-5xl text-[#0E2A46] leading-[120%] font-bold capitalize">
                        {lesson.title}
                    </h3>

                    <div className="flex max-w-full gap-5">
                        {lesson.material_type == "VIDEO" ? (
                            <div className="flex items-center gap-1">
                                <Clock size={20} color="#3F3F8F" />
                                <p className="text-xl flex gap-2">
                                    Продолжительность урока
                                    <span className="font-bold">
                                        {durationFormat(videoDuration)}
                                    </span>
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <Presentation size={20} color="#3F3F8F" />
                                <p className="text-xl flex gap-2">
                                    Количество слайдов
                                    <span className="font-bold">{20}</span>
                                </p>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <User size={20} color="#3F3F8F" />
                            <p className="text-xl flex gap-2">
                                Students
                                <span className="font-bold">20+</span>
                            </p>
                        </div>
                    </div>

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
                                setActiveTab("description");
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
                                setActiveTab("practice");
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
                                setActiveTab("teacher");
                            }}
                        />
                    </div>

                    {activeTab == "description" ? <Description /> : null}
                    {activeTab == "practice" ? <Practice /> : null}
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
                </div>

                <Footer />
            </div>
        </>
    );
}
