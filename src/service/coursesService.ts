import type {Course, CourseWithModules} from "./types";
import api from "./api";


export async function getAllCourses(): Promise<Course[]> {
    const {data} = await api.get('/courses');
    return data.data;
}

export async function getCourseById(id: string): Promise<CourseWithModules> {
    const {data} = await api.get(`/courses/${id}`);
    return data.data;
}
