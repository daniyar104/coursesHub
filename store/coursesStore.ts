import {Course, type CourseWithModules} from "../service/types";
import {create} from "zustand";
import {getAllCourses, getCourseById} from "../service/coursesService";


interface CourseState {
    courses: Course[] | null;
    courseDetail: CourseWithModules | null;
    loading: boolean;
    error: boolean | null;

    fetchAllCourses: () => Promise<void>;
    fetchCourseById: (id: string) => Promise<void>;
}


export const useCoursesStore = create<CourseState>((set) => ({
    courses: null,
    courseDetail: null,
    loading: false,
    error: false,

    fetchAllCourses: async () => {
        set({loading: true, error: false})
        try{
            const courses = await getAllCourses();
            set({
                courses,
                loading: false
            });
        }catch (error){
            set({
                courses: null,
                loading: false,
                error: error?.message || 'Не удалось!',
            });
        }
    },

    fetchCourseById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const course = await getCourseById(id);
            set({ courseDetail: course, loading: false });
        } catch (err: any) {
            set({ courseDetail: null, loading: false, error: err?.message || "Не удалось загрузить курс" });
        }
    },
}))
