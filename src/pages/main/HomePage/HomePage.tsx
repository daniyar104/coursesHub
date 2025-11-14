import Header from "../../../components/Header/HomeHeader.tsx";
import Slider from "../../../components/ui/Slider/Slider.tsx";
import CourseCarousel from "./section/CourseCarousel.tsx";

function HomePage() {
    return (
        <>
            <Header />
            <div className=" max-w-[1320px] w-9/10 mx-auto">
                <Slider />
            </div>
            <CourseCarousel />
        </>
    );
}

export default HomePage;
