import Header from "../../../components/Header/HomeHeader.tsx";
import Slider from "../../../components/ui/Slider/Slider.tsx";
import CallToActionSection from "../../../components/ui/Slider/forSlider/CallToAction.tsx";
import PresentPage from "../present/PresentPage.tsx";
import CoursesList from "../coursesList/CoursesList.tsx";


function HomePage() {
    return (
        <>
            <Header />

            {/* Hero Slider */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-12">
                <Slider
                    elements={[
                        <CallToActionSection />,
                        <CallToActionSection />
                    ]}
                />
            </div>

            {/* About Platform Section */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-16">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Платформа для студентов университетов города
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Образовательная платформа для студентов местных университетов.
                        Получайте доступ к курсам вашего учебного заведения, изучайте материалы
                        и отслеживайте свой прогресс в одном месте.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">📚</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Курсы вашего вуза</h3>
                                <p className="text-sm text-gray-600">Доступ только к курсам вашего университета</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">👨‍🎓</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Для студентов</h3>
                                <p className="text-sm text-gray-600">Только студенты и преподаватели вашего вуза</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Отслеживание прогресса</h3>
                                <p className="text-sm text-gray-600">Следите за своими достижениями</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Learning Section */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-16">
                <PresentPage />
            </div>

            {/* Available Courses Section */}
            <div className="max-w-[1320px] w-9/10 mx-auto mb-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        Доступные курсы
                    </h2>
                    <p className="text-lg text-gray-600">
                        Курсы от преподавателей вашего университета
                    </p>
                </div>
                <CoursesList />
            </div>
        </>
    );
}

export default HomePage;
