import Header from '../../../components/Header/HomeHeader.tsx';
import Slider from '../../../components/ui/Slider/Slider.tsx';
import CallToActionSection from '../../../components/ui/Slider/forSlider/CallToAction.tsx';
import PresentPage from '../present/PresentPage.tsx';
import CoursesList from '../coursesList/CoursesList.tsx';
import ModalInfo from '../../../components/Footer/ModalInfo.tsx';
import { useLessonStore } from '../../../store/lessonStore.ts';
import { useEffect } from 'react';
import CareerGrowthSection from '../../../components/ui/Slider/forSlider/CareerGrowth.tsx';

function HomePage() {
    const lastCourse = useLessonStore((state) => state.lastCourse);
    const fetchLastCourse = useLessonStore((state) => state.fetchLastCourse);

    useEffect(() => {
        fetchLastCourse();
    }, [fetchLastCourse]);

    console.log(lastCourse);

    return (
        <>
            <Header />
            <div className=" max-w-[1320px] w-9/10 max-h-100 mx-auto">
                <Slider elements={[<CallToActionSection />, <CareerGrowthSection />]} />
            </div>

            {/* About Platform Section */}
            <div className="max-w-[1320px] w-9/10 mx-auto my-16">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Платформа для студентов университетов города
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Образовательная платформа для студентов местных университетов. Получайте
                        доступ к курсам вашего учебного заведения, изучайте материалы и отслеживайте
                        свой прогресс в одном месте.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">📚</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Курсы вашего вуза
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Доступ только к курсам вашего университета
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">👨‍🎓</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Для студентов</h3>
                                <p className="text-sm text-gray-600">
                                    Только студенты и преподаватели вашего вуза
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    Отслеживание прогресса
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Следите за своими достижениями
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- НОВАЯ СЕКЦИЯ: СТАТИСТИКА --- */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-100">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">15+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                            Вузов партнеров
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">200+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                            Активных курсов
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">5000+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                            Студентов
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                            Доступ к знаниям
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Learning Section */}
            {lastCourse.length > 0 && (
                <div className="max-w-[1320px] w-9/10 mx-auto mb-16">
                    <PresentPage lastCourses={lastCourse} />
                </div>
            )}

            {/* Available Courses Section */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Доступные курсы</h2>
                    <p className="text-lg text-gray-600">
                        Курсы от преподавателей вашего университета
                    </p>
                </div>
                <CoursesList />
            </div>

            {/* --- НОВАЯ СЕКЦИЯ: FAQ (Часто задаваемые вопросы) --- */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Часто задаваемые вопросы
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg mb-2">Как получить доступ к курсу?</h4>
                        <p className="text-gray-600">
                            Войдите в систему, используя корпоративную почту вашего университета.
                            Доступ ко всем актуальным курсам откроется автоматически.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg mb-2">Бесплатно ли это для студентов?</h4>
                        <p className="text-gray-600">
                            Да, использование платформы полностью бесплатно для всех студентов и
                            сотрудников государственных вузов города.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg mb-2">
                            Можно ли смотреть лекции с телефона?
                        </h4>
                        <p className="text-gray-600">
                            Конечно! Платформа полностью адаптирована под мобильные устройства,
                            чтобы вы могли учиться в любое удобное время.
                        </p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg mb-2">Как связаться с преподавателем?</h4>
                        <p className="text-gray-600">
                            Внутри каждого курса есть раздел «Поддержка», где вы можете задать
                            вопрос автору курса или обсудить тему с однокурсниками.
                        </p>
                    </div>
                </div>
            </div>

            <ModalInfo />
        </>
    );
}

export default HomePage;
