export interface Course {
    id: number;
    title: string;
    progress: number;
    status: string;
    color: string;
}

interface CourseCardProps {
    course: Course;
}

export default function CourseCardProfile({ course }: CourseCardProps) {
    return (
        <div className="flex flex-col justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {course.title}
            </h3>

            {/* Индикатор прогресса */}
            <div className="flex flex-col h-15 gap-2 mt-auto mb-2.5">
                <div className="flex justify-between items-center text-sm text-gray-500 ">
                    <span>{course.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`${course.color} h-2.5 rounded-full`}
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <p className="text-sm font-medium text-gray-600">
                    {course.progress}% выполнено
                </p>
            </div>
            <button className="mt-4 w-full py-2 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md">
                {course.status === "Завершен"
                    ? "Просмотреть сертификат"
                    : "Продолжить обучение"}
            </button>
        </div>
    );
}
