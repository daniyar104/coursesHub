import { type Course, type CourseWithModules } from "../service/types";
import { create } from "zustand";
import {
    getAllCourses,
    getCourseById,
    registerCourseById,
} from "../service/coursesService";

interface CourseState {
    courses: Course[] | null;
    courseDetail: CourseWithModules | null;
    courseReg: Object;
    loading: boolean;
    error: boolean | null;

    fetchAllCourses: () => Promise<void>;
    fetchCourseById: (id: string) => Promise<void>;
    fetchRegisterCourse: (
        id: string
    ) => Promise<{ success: boolean; message?: string }>;
}

export const useCoursesStore = create<CourseState>((set) => ({
    courses: null,
    courseDetail: null,
    courseReg: {},
    loading: false,
    error: false,

    fetchAllCourses: async () => {
        set({ loading: true, error: false });
        try {
            const courses = await getAllCourses();
            set({
                courses,
                loading: false,
            });
        } catch (error) {
            set({
                courses: null,
                loading: false,
                error: error?.message || "Не удалось!",
            });
        }
    },

    fetchCourseById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const course = await getCourseById(id);
            set({ courseDetail: course, loading: false });
        } catch (err: any) {
            set({
                courseDetail: null,
                loading: false,
                error: err?.message || "Не удалось загрузить курс",
            });
        }
    },

    fetchRegisterCourse: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const res = await registerCourseById(id);
            set({ courseReg: res, loading: false });
            return res;
        } catch (err) {
            set({
                courseReg: {},
                loading: false,
                error: err?.message || "Ошибка с покупкой курса",
            });
            return { success: false, message: err?.message || "Ошибка" };
        }
    },
}));
