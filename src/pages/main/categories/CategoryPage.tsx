import React from 'react';
import {useParams} from "react-router-dom";
import {categories, mockCourses} from "../../../../data/courses.tsx";
import CardCourses from "../../../components/ui/Card/CardCourse.tsx";
import Divider from "../../../components/ui/Divider/Divider.tsx";
import Breadcrumb from "../../../components/ui/Breadcrumb/Breadcrumb.tsx";

export default function CategoryPage(){
    const { slug } = useParams<{ slug: string }>();

    const courses = mockCourses.filter((course) => course.category === slug);

    // Найти категорию по slug
    const category = categories.find((cat) => cat.slug === slug);

    const breadcrumbItems = [
        { name: "Главная", path: "/" },
        { name: "Категории", path: "/categories" },
        { name: category?.name || slug }, // текущая страница, не кликабельная
    ];
    return (
        <div className="p-8">
            <Breadcrumb items={breadcrumbItems} />
            <Divider thickness="2px" margin="2rem 0" />
            <div className="flex justify-between mb-6 items-center">
                <div>
                    <h1 className="text-4xl mb-4 font-semibold">{slug?.toUpperCase()}</h1>
                    {category && (
                        <p className="text-gray-500 max-w-3xl">
                            {category.description}
                        </p>
                    )}
                </div>
                {/*<div className="relative top-26">*/}
                {/*    {category?.icon && React.cloneElement(category.icon, { size: 150, color: "grey" })}*/}
                {/*</div>*/}
                <div className="items-center text-center text-l">
                    <div className="font-bold">
                        {courses.length}
                    </div>
                    курсов
                </div>
            </div>
            <Divider thickness="2px" margin="2rem 0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
                {courses.length > 0 ? (
                    courses.map((course) => <CardCourses key={course.id} course={course} />)
                ) : (
                    <p className="text-gray-500 col-span-full">Курсов нет</p>
                )}
            </div>
        </div>
    );
}
