import Header from "../../../components/Header/HomeHeader.tsx";
import CallToActionSection from "../../../components/ui/Slider/forSlider/CallToAction.tsx";
import Slider from "../../../components/ui/Slider/Slider.tsx";
import SkillsSection from "./section/SkillsSection.tsx";

function HomePage() {
    return (
        <>
            <Header />
            <div className=" max-w-[1320px] w-9/10 mx-auto">
                <Slider
                    elements={[
                        <CallToActionSection />,
                        <CallToActionSection />,
                    ]}
                />
            </div>
            <SkillsSection />
        </>
    );
}

export default HomePage;
