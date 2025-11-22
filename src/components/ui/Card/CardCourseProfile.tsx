import type {EnrolledCourse} from "../../../service/types.ts";

interface CourseCardProps {
    course: EnrolledCourse;
}

export default function CourseCardProfile({ course }: CourseCardProps) {
    const progress = Number(course.enrollment.progress) || 0;

    // Цвет прогресс-бара по статусу
    const progressColor =
        course.enrollment.status === "completed"
            ? "bg-green-500"
            : course.enrollment.status === "active"
                ? "bg-indigo-600"
                : "bg-gray-400";

    return (
        <div className="flex flex-col justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">

            {/* Название */}
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {course.title}
            </h3>

            {/* Категория */}
            <p className="text-sm text-gray-500 mb-3">
                {course.categories?.name}
            </p>

            {/* Инфо о курсе */}
            <div className="text-sm text-gray-600 mb-4">
                <p>Модулей: {course._count.modules}</p>
                <p>Уроков: {course._count.lessons}</p>
            </div>

            {/* Прогресс */}
            <div className="flex flex-col h-15 gap-2 mt-auto mb-2.5">
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                        {course.enrollment.status === "completed"
                            ? "Завершён"
                            : course.enrollment.status === "active"
                                ? "Активный"
                                : "Остановлен"}
                    </span>
                    <span>{progress}%</span>
                </div>

                {/* Прогресс-бар */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`${progressColor} h-2.5 rounded-full transition-all`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <p className="text-sm font-medium text-gray-600">
                    {progress}% выполнено
                </p>
            </div>

            {/* Кнопка */}
            <button className="mt-4 w-full py-2 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md">
                {course.enrollment.status === "completed"
                    ? "Просмотреть сертификат"
                    : "Продолжить обучение"}
            </button>
        </div>
    );
}
