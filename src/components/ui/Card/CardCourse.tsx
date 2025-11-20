import Star from "../../../../assets/icon/Star.png";
import StudentIcon from "../../../../assets/icon/CardStudent.png";
import TimeIcon from "../../../../assets/icon/CardTime.png";
import CourseIcon from "../../../../assets/icon/CardCourse.png";
import Arrow from "../../../../assets/icon/Arrow.svg";
import CardBackground from "../../../../assets/icon/CardBackground.png";
import type {Course} from "../../../../service/types.ts";
import {useNavigate} from "react-router-dom";

interface CardCoursesProps {
    course: Course;
}
export default function CardCourses({ course }: CardCoursesProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course.id}`);
    };
    return (
        <div
            className="max-w-[420px] w-full max-h-[585px] h-full rounded-[10px] bg-[#F4F5F8] border border-dashed border-[#704fe6] p-5 pb-7 flex flex-col cursor-pointer"
            onClick={handleClick}
        >
            {/* Картинка курса */}
            <div className="w-full max-h-[250px] h-full rounded-md relative overflow-hidden mb-8">
                {/*<img*/}
                {/*    src={course.image}*/}
                {/*    alt={course.title}*/}
                {/*    className="w-full h-full object-cover"*/}
                {/*/>*/}
                {/*<div className="absolute bottom-2 left-2 py-3 px-7 rounded-sm text-xs bg-[#17254e] text-white">*/}
                {/*    {course.category.toUpperCase()}*/}
                {/*</div>*/}
            </div>

            {/* Основной блок с фоном */}
            <div
                className="bg-no-repeat bg-center bg-contain"
                style={{ backgroundImage: `url(${CardBackground})` }}
            >
                {/* Рейтинг и цена */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex gap-1 items-center">
                        <img src={Star} alt="star icon" className="h-[14px] w-auto" />
                        <span className="text-[#4D5756] text-sm font-medium">
              {/*{course.rating}*/}
            </span>
                    </div>
                    <span className="text-[#704FE6] text-sm font-medium">
            {/*{course.price === 0 ? "Free" : course.price.toLocaleString()}*/}
          </span>
                </div>

                {/* Название курса */}
                <h3 className="text-[#0E2A46] font-semibold text-[22px] leading-8 mb-6">
                    {course.title}
                </h3>

                {/* Информация: уроки / время / студенты */}
                <div className="p-5 flex w-full justify-between items-center rounded-sm bg-white mb-8">
                    <div className="flex gap-2 items-center">
                        <img src={CourseIcon} alt="Course Icon" className="w-auto h-full" />
                        <span className="text-sm text-[#17254E]">
              Уроков {course._count?.lessons}
            </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={TimeIcon} alt="Time Icon" className="w-auto h-full" />
                        {/*<span className="text-sm text-[#17254E]">{course.duration}</span>*/}
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={StudentIcon} alt="Student Icon" className="w-auto h-full" />
                        <span className="text-sm text-[#17254E]">
              {/*Студентов {course.students}+*/}
            </span>
                    </div>
                </div>

                {/* Автор и кнопка */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img
                            src={course.authorImage || "https://cdn.hackaday.io/images/3553251501638077867.png"}
                            alt="Author Avatar"
                            className="w-11 h-11 rounded-full border-2 border-[#704fe6]"
                        />
                        <span className="text-[#17254E] text-sm font-medium">
              {/*{course.author}*/}
            </span>
                    </div>

                    <button className="w-[120px] h-10 flex items-center justify-center gap-[6px] text-white text-sm bg-[#3F3F8F] rounded-[50px] hover:bg-[#5a3fd8] transition">
                        Enroll <img src={Arrow} alt="Arrow Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}
