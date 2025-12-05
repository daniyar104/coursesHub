import type { Course, CourseWithModules } from "./types";
import api from "./api";
import { getToken } from "../utils/auth";

export async function getAllCourses(): Promise<Course[]> {
    const { data } = await api.get("/courses");
    return data.data;
}

export async function getCourseById(id: string): Promise<CourseWithModules> {
    const token = getToken();
    const headers: Record<string, string> = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const { data } = await api.get(`/courses/${id}`, { headers });
    return data.data;
}

// Заявка на приобретение курса
export async function registerCourseById(
    id: string
): Promise<{ success: boolean; message?: string }> {
    try {
        const token = getToken();
        if (!token) throw new Error("No token found");

        const { data } = await api.post(
            `/courses/${id}/register`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return { success: true, message: data.message };
    } catch (err: any) {
        console.error("Failed to register course:", err);
        return {
            success: false,
            message: err.response?.data?.message || "Ошибка регистрации",
        };
    }
}

export const getEnrolledCourses = async () => {
    const token = getToken();

    if (!token) {
        console.error("No token found in getEnrolledCourses");
        throw new Error("Необходима авторизация");
    }

    try {
        const response = await api.get("/courses/enrolled", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data; // массив EnrolledCourse[]
    } catch (error: any) {
        console.error(
            "Error fetching enrolled courses:",
            error.response?.status,
            error.response?.data
        );
        throw error;
    }
};

// Проверка регистрации на курс
export const checkEnrollmentStatus = async (courseId: string) => {
    const token = getToken();

    if (!token) {
        return { enrolled: false };
    }

    try {
        const enrolledCourses = await getEnrolledCourses();
        const enrollment = enrolledCourses.find(
            (course: any) => course.course_id === courseId
        );

        return {
            enrolled: !!enrollment,
            enrollmentId: enrollment?.id,
        };
    } catch (error) {
        console.error("Error checking enrollment status:", error);
        return { enrolled: false };
    }
};

export const checkRegistration = async (id: string) => {
    const token = getToken();

    try {
        const res = await api.get(`/courses/${id}/check-registration`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Error checking enrollment status:", error);
        return { enrolled: false };
    }
};
