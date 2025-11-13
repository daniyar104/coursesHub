import {useEffect} from "react";
import Categories from "../categories/Categories.tsx";
import {useCoursesStore} from "../../../../store/useCoursesStore.ts";
import CardCourses from "../../../components/ui/Card/CardCourse.tsx";

export default function CoursesList() {
    const courses = useCoursesStore((state) => state.courses);
    const getAll = useCoursesStore((state) => state.getAll);
    const loading = useCoursesStore((state) => state.loading);

    useEffect(() => {
        getAll()
    }, []);

    if (loading) return <p>Загрузка...</p>;
    return (
        <>
            {/*<Categories />*/}
            {courses.map((course) => (
                <div key={course.id}>
                    <CardCourses course={course}/>
                </div>
            ))}
        </>
    );
}
