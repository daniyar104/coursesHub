import Header from "../../../components/Header/HomeHeader.tsx";
import Slider from "../../../components/ui/Slider/Slider.tsx";
import CallToActionSection from "../../../components/ui/Slider/forSlider/CallToAction.tsx";
import PresentPage from "../present/PresentPage.tsx";
import CoursesList from "../coursesList/CoursesList.tsx";


function HomePage() {
    return (
        <>
            <Header />
            <div className=" max-w-[1320px] w-9/10 mx-auto">
                <Slider
                    elements={[
                        <CallToActionSection />,
                        <CallToActionSection />
                    ]}
                />
            </div>
            {/*<CourseCarousel />*/}
            <div className=" max-w-[1320px] w-9/10 mx-auto ">
                <PresentPage />
                <CoursesList />
            </div>
        </>
    );
}

export default HomePage;
