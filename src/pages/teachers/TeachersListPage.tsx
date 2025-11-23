import { useState } from "react";
import Header from "../../components/Header/HomeHeader";
import { mockTeachers } from "../../service/teacherService";
import TeacherCard from "../../components/ui/Card/TeacherCard";

export default function TeachersListPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("all");

    // Get unique departments
    const departments = ["all", ...new Set(mockTeachers.map(t => t.department))];

    // Filter teachers
    const filteredTeachers = mockTeachers.filter(teacher => {
        const matchesSearch =
            teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    return (
        <>
            <Header />

            <div className="max-w-[1320px] w-9/10 mx-auto py-12">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Наши преподаватели
                    </h1>
                    <p className="text-xl text-gray-600">
                        Познакомьтесь с опытными преподавателями нашего университета
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Поиск по имени или специализации..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg"
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Department Filter */}
                    <div className="flex flex-wrap gap-3">
                        {departments.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDepartment(dept)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedDepartment === dept
                                    ? "bg-indigo-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {dept === "all" ? "Все факультеты" : dept}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Найдено преподавателей: <span className="font-semibold">{filteredTeachers.length}</span>
                    </p>
                </div>

                {/* Teachers Grid */}
                {filteredTeachers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTeachers.map((teacher) => (
                            <TeacherCard key={teacher.id} teacher={teacher} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg
                            className="w-24 h-24 mx-auto text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            Преподаватели не найдены
                        </h3>
                        <p className="text-gray-500">
                            Попробуйте изменить параметры поиска
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
