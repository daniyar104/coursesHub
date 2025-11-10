import Star from "../../../../assets/icon/Star.png"
import StudentIcon from "../../../../assets/icon/CardStudent.png"
import TimeIcon from "../../../../assets/icon/CardTime.png"
import CourseIcon from "../../../../assets/icon/CardCourse.png"
import Arrow from "../../../../assets/icon/Arrow.svg"
import CardBackground from "../../../../assets/icon/CardBackground.png"

export default function CardCourses(){
    return(
        <div className="max-w-[420px] w-full max-h-[585px] h-full rounded-[10px] bg-[#F4F5F8] border-1 border-dashed border-[#704fe6] p-5 pb-7 flex flex-col ff-[]">
            <div className="w-full max-h-[250px] h-full rounded-md relative overflow-hidden mb-8">
                <img src="https://avatars.mds.yandex.net/i?id=bc4060406b0e33d2ca2766db2b67277d_l-10158105-images-thumbs&n=13" alt="" className="w-full h-full object-cover"/>
                <div className="absolute bottom-2 text-white left-2 py-3 px-7 rounded-sm text-xs bg-[#17254e]">Digital Marketing</div>
            </div>
            <div className="bg-no-repeat bg-center bg-contain" style={{ backgroundImage: `url(${CardBackground})` }}>
                <div className="flex justify-between items-center mb-5">
                    <div className="flex gap-1 items-center">
                        <img src={Star} alt="star icon" className="h-[14px] w-auto "/>
                        <span className="text-[#4D5756] text-sm font-medium">4.5k</span>
                    </div>
                    <span className="text-[#704FE6] text-sm font-medium">$50.00</span>
                </div>
                <h3 className="text-[#0E2A46] font-semibold text-[22px] leading-8 mb-6">It Statistics Data Science And Business Analysis</h3>
                <div className="p-5 flex w-full justify-between items-center rounded-sm bg-white mb-8">
                    <div className="flex gap-2 items-center">
                        <img src={CourseIcon} alt="Course Icon" className="w-auto h-full"/>
                        <span className="text-sm text-[#17254E]">Lesson 10</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={TimeIcon} alt="Time Icon" className="w-auto h-full"/>
                        <span className="text-sm text-[#17254E]">19h 30m</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={StudentIcon} alt="Student Icon" className="w-auto h-full"/>
                        <span className="text-sm text-[#17254E]">Students 20+</span>
                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-2">
                        <img src="https://cdn.hackaday.io/images/3553251501638077867.png" alt="Person Avatar Image" className="w-11 h-11 rounded-full border-2 border-[#704fe6]"/>
                        <span className="text-[#17254E] text-sm font-medium">Samantha</span>
                    </div>

                    <button className="w-[120px] h-10 flex items-center justify-center gap-[6px] text-white text-sm bg-[#704FE6] rounded-[50px]">Enroll <img src={Arrow} alt="Arrow Icon"/></button>
                </div>
            </div>
        </div>
    )
}