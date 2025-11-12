import {categories, mockCourses} from "../../../../data/courses.tsx";
import CardCourses from "../../../components/ui/Card/CardCourse.tsx";
import {useState} from "react";
import type {Course} from "../../../../service/types.ts";
import Categories from "../categories/Categories.tsx";

export default function CoursesList() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Фильтрация по категории
    const filteredCourses: Course[] =
        selectedCategory === "all"
            ? mockCourses
            : mockCourses.filter((c) => c.category === selectedCategory);

    return (
        <>
            <Categories />
            <div className="p-8">
                <div className="text-xl font-bold mb-4">Популярные курсы</div>
                {/* 🔘 Кнопки категорий */}
                <div className="flex gap-4 mb-8 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-4 py-2 rounded-full border transition cursor-pointer ${
                            selectedCategory === "all"
                                ? "bg-[#3F3F8F] text-white"
                                : "bg-white text-[#3F3F8F] border-[#3F3F8F]"
                        }`}
                    >
                        Все
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`px-4 py-2 rounded-full border transition cursor-pointer ${
                                selectedCategory === cat.slug
                                    ? "bg-[#3F3F8F] text-white"
                                    : "bg-white text-[#3F3F8F] border-[#3F3F8F]"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* 📚 Сетка курсов */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CardCourses key={course.id} course={course} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">
                            Нет курсов в этой категории
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
