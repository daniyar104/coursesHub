import { type Course, type CourseWithModules } from "../service/types";
import { create } from "zustand";
import {
    getAllCourses,
    getCourseById,
    registerCourseById,
    getEnrolledCourses, // ← добавил
} from "../service/coursesService";

interface CourseState {
    courses: Course[] | null;
    enrolledCourses: Course[] | null; // ← добавил
    courseDetail: CourseWithModules | null;
    courseReg: Object;
    loading: boolean;
    error: boolean | null;

    fetchAllCourses: () => Promise<void>;
    fetchEnrolledCourses: () => Promise<void>; // ← добавил
    fetchCourseById: (id: string) => Promise<void>;
    fetchRegisterCourse: (
        id: string
    ) => Promise<{ success: boolean; message?: string }>;
}

export const useCoursesStore = create<CourseState>((set) => ({
    courses: null,
    enrolledCourses: null, // ← добавил
    courseDetail: null,
    courseReg: {},
    loading: false,
    error: false,

    // =============================
    //   🔹 Получить ВСЕ курсы
    // =============================
    fetchAllCourses: async () => {
        set({ loading: true, error: false });
        try {
            const courses = await getAllCourses();
            set({
                courses,
                loading: false,
            });
        } catch (error: any) {
            set({
                courses: null,
                loading: false,
                error: error?.message || "Не удалось!",
            });
        }
    },

    // =============================
    //   🔹 Получить ЗАПИСАННЫЕ курсы
    // =============================
    fetchEnrolledCourses: async () => {
        set({ loading: true, error: false });
        try {
            const courses = await getEnrolledCourses();
            set({
                enrolledCourses: courses,
                loading: false,
            });
        } catch (error: any) {
            set({
                enrolledCourses: null,
                loading: false,
                error: error?.message || "Не удалось загрузить записанные курсы!",
            });
        }
    },

    // =============================
    //   🔹 Получить курс по ID
    // =============================
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

    // =============================
    //   🔹 Регистрация / покупка курса
    // =============================
    fetchRegisterCourse: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const res = await registerCourseById(id);
            set({ courseReg: res, loading: false });
            return res;
        } catch (err: any) {
            set({
                courseReg: {},
                loading: false,
                error: err?.message || "Ошибка с покупкой курса",
            });
            return { success: false, message: err?.message || "Ошибка" };
        }
    },
}));
