import type { Teacher } from "../../../service/types";
import { useNavigate } from "react-router-dom";

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/teachers/${teacher.id}`)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
        >
            {/* Teacher Avatar */}
            <div className="flex justify-center mb-4">
                <img
                    src={teacher.avatar}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                />
            </div>

            {/* Teacher Info */}
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-indigo-600 font-semibold mb-2">
                    {teacher.position}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                    {teacher.department}
                </p>
            </div>

            {/* Specialization Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                {teacher.specialization.map((spec, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                    >
                        {spec}
                    </span>
                ))}
            </div>

            {/* Short Bio */}
            <p className="text-gray-700 text-sm text-center line-clamp-3 mb-4">
                {teacher.shortBio}
            </p>

            {/* Contact Info */}
            <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{teacher.phone}</span>
                </div>
            </div>

            {/* View Profile Button */}
            <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                    Подробнее
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </div>
    );
}
