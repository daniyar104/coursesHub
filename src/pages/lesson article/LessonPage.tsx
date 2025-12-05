import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Presentation, User } from 'lucide-react';

// Components
import Header from '../../components/Header/HomeHeader';
import Footer from '../../components/Footer/FooterLesson';
import Button from '../../components/ui/Button';
import ButtonLesson from '../../components/ui/Button/ButtonLesson';
import Divider from '../../components/ui/Divider/Divider';
import Loading from '../../components/ui/Loading/Loading';
import MaterialRenderer from './components/MaterialRenderer';
import ModulePanel from './components/ModulePanel';

// Tabs
import Description from './tab/Description';
import Practice from './tab/Practice';
import TeacherProfile from './tab/TeacherProfile';

// Stores & Utils
import { useCoursesStore } from '../../store/coursesStore';
import { useLessonStore } from '../../store/lessonStore';
import durationFormat from '../../utils/durationFormat';

// Types
import type { Course } from '../../service/types';
import { useTestStore } from '../../store/useTestStore';
import TestSection from '../test/TestSection';

// Static Data
const TEACHER_DATA = {
    name: 'Каюпов Еркебулан',
    role: 'Преподаватель',
    description:
        'Tempor orci dapibus ultrices in iaculis nunc sed augue. Feugiat in ante metus dictum at tempor commodo.',
    education: ['Bachelor of Computer Science, MIT', 'Master in Educational Technology, Harvard'],
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '(568) 367-987-237',
    location: 'Hudson, Wisconsin(WI), 54016',
    email: 'govillage@gmail.com',
};
{
    /* <Button
    children="Описание"
    variant="none"
    className={getTabClass("description")}
    onClick={() => setActiveTab("description")}
/> */
}

const BUTTON_DATA = [
    { title: 'Описание', for_what: 'description' },
    { title: 'Практика', for_what: 'practice' },
    { title: 'Преподаватель', for_what: 'teacher' },
];
export default function LessonPage() {
    const { courseId, lessonId } = useParams<{
        courseId: string;
        lessonId: string;
    }>();

    // Course Store
    const fetchCourseById = useCoursesStore((state) => state.fetchCourseById);
    const course = useCoursesStore((state) => state.courseDetail);
    const courseLoading = useCoursesStore((state) => state.loading);

    // Lesson Store (Split selectors to prevent infinite re-renders)
    const lessonComplete = useLessonStore((state) => state.complete);
    const lessonLoading = useLessonStore((state) => state.loading);
    const fetchCompleteLesson = useLessonStore((state) => state.fetchCompleteLesson);
    const fetchMarkLessonAcces = useLessonStore((state) => state.fetchMarkLessonAccess);

    // Test Store
    const { currentTest, answers, loading, error, result, fetchLessonTest, submitTest, setAnswer } =
        useTestStore();

    // Local State
    const [activeTab, setActiveTab] = useState('description');
    const [videoDuration, setVideoDuration] = useState(0);

    // Computed Logic
    const isJustCompleted = lessonComplete.length > 0;

    useEffect(() => {
        if (courseId) fetchCourseById(courseId);
    }, [courseId, fetchCourseById]);

    // Derived State: Calculate lessons on the fly without useEffect
    const { prevLesson, currentLesson, nextLesson } = useMemo(() => {
        if (!course || !lessonId)
            return { prevLesson: null, currentLesson: null, nextLesson: null };

        const allLessons = course.modules.flatMap((m) => m.lessons);
        const currentIndex = allLessons.findIndex((l) => l.id === lessonId);

        if (currentIndex === -1) return { prevLesson: null, currentLesson: null, nextLesson: null };

        return {
            prevLesson: allLessons[currentIndex - 1] || null,
            currentLesson: allLessons[currentIndex],
            nextLesson: allLessons[currentIndex + 1] || null,
        };
    }, [course, lessonId]);

    useEffect(() => {
        if (lessonId) {
            fetchLessonTest(lessonId);
        }
    }, [lessonId, fetchLessonTest]);

    useEffect(() => {
        console.log(currentTest);
    }, [currentTest]);

    // Helpers
    const getTabClass = (tabName: string) =>
        `cursor-pointer text-xl ${
            activeTab === tabName
                ? 'bg-[#5344B6] text-white hover:bg-[#312679]'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
        }`;

    useEffect(() => {
        if (course && currentLesson) {
            fetchMarkLessonAcces(course.id, currentLesson.id);
        }
    }, [course, currentLesson]);

    // Renders
    if (courseLoading)
        return (
            <div className="w-screen h-screen">
                <Loading />
            </div>
        );
    if (!course) return <div>Курс не найден</div>;
    if (!currentLesson) return <div>Урок не найден</div>;

    return (
        <>
            <Header />

            {/* контейнер */}
            <div className="relative max-w-[1550px] w-[90%] mx-auto min-h-screen shadow-xl overflow-x-hidden">
                {/* Внутрений Хэдэр на всю ширину */}
                <div className="w-full min-h-16 bg-[#3F3F8F]/10 px-7 py-3 flex items-center justify-between">
                    <ButtonLesson text="Вернуться" link={`/course/${courseId}/curriculum`} />

                    <h3 className="text-2xl text-center font-bold uppercase flex-1 max-w-[700px]  text-[#4D5756]">
                        {course.title}
                    </h3>

                    <div className="max-w-35 w-[90%] h-full flex items-center justify-between">
                        {prevLesson && (
                            <div className="flex-1 flex justify-start">
                                <ButtonLesson
                                    link={`/course/${courseId}/lesson/${prevLesson.id}`}
                                />
                            </div>
                        )}
                        {nextLesson && (
                            <div className="flex-1 flex justify-end">
                                <ButtonLesson
                                    link={`/course/${courseId}/lesson/${nextLesson.id}`}
                                    direction="right"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Контент */}
                <div className="w-[90%] max-w-[1230px] mx-auto mt-5 flex flex-col items-start gap-6">
                    <div className="w-full h-full  max-h-[700px]">
                        <MaterialRenderer
                            type={currentLesson.material_type}
                            title={currentLesson.title}
                            material_url={currentLesson.material_url}
                            onVideoDuration={setVideoDuration}
                        />
                    </div>

                    {/* Боковая панель с уроками */}
                    <ModulePanel modules={course.modules} courseId={course.id} />

                    <h3 className="text-5xl text-[#0E2A46] leading-[120%] font-bold capitalize">
                        {currentLesson.title}
                    </h3>

                    <div className="flex max-w-full gap-5">
                        {currentLesson.material_type === 'VIDEO' ? (
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
                        {BUTTON_DATA.map((btn, idx) => (
                            <Button
                                key={idx}
                                children={btn.title}
                                variant="none"
                                className={getTabClass(btn.for_what)}
                                onClick={() => setActiveTab(btn.for_what)}
                            />
                        ))}
                    </div>

                    {activeTab === 'description' && <Description />}
                    {activeTab === 'practice' && <Practice />}
                    {activeTab === 'teacher' && <TeacherProfile {...TEACHER_DATA} />}

                    <Button
                        children={
                            isJustCompleted ? 'Урок пройден!' : 'Отметить урок как выполненный'
                        }
                        variant="none"
                        className={`cursor-pointer text-xl w-full mb-20 transition-colors ${
                            isJustCompleted
                                ? 'bg-green-600 text-white cursor-default'
                                : 'bg-[#5344B6] text-white hover:bg-[#312679]'
                        }`}
                        onClick={() => {
                            if (!isJustCompleted) {
                                fetchCompleteLesson(courseId!, lessonId!);
                            }
                        }}
                        loading={lessonLoading}
                        disabled={lessonLoading || isJustCompleted}
                    />

                    {currentTest && <TestSection />}
                </div>

                <Footer />
            </div>
        </>
    );
}
