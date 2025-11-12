import {useParams} from "react-router-dom";
import {mockCourses} from "../../../../data/courses.tsx";
import CardCourses from "../../../components/ui/Card/CardCourse.tsx";

export default function CategoryPage(){
    const { slug } = useParams<{ slug: string }>();

    const courses = mockCourses.filter((course) => course.category === slug);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
                Курсы по {slug?.toLowerCase()}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.length > 0 ? (
                    courses.map((course) => <CardCourses key={course.id} course={course} />)
                ) : (
                    <p className="text-gray-500 col-span-full">Курсов нет</p>
                )}
            </div>
        </div>
    );
}
