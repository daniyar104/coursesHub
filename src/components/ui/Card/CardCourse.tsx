import { BookOpen, Star, ArrowRight } from "lucide-react";
import type { Course } from "../../../service/types.ts";
import { useNavigate } from "react-router-dom";

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
            className="group h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 cursor-pointer flex flex-col"
            onClick={handleClick}
        >
            {/* Картинка курса */}
            <div className="relative h-48 bg-gray-100 overflow-hidden shrink-0">
                {course.image ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <BookOpen className="w-16 h-16 text-indigo-200" />
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-900 shadow-sm">
                        {(course as any).categories?.name || 'Курс'}
                    </span>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="bg-indigo-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-indigo-500">
                        {course.difficulty_level || 'General'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors h-14">
                        {course.title}
                    </h3>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">
                    {course.short_description || "Описание курса отсутствует"}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-medium text-gray-700">{course.avg_rating ? Number(course.avg_rating).toFixed(1) : '5.0'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                            <span>{course._count?.lessons || 0} уроков</span>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                        <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
