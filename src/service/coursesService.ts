import type { Course, CourseWithModules } from "./types";
import api from "./api";
import { getToken } from "../utils/auth";

export async function getAllCourses(): Promise<Course[]> {
    const { data } = await api.get("/courses");
    return data.data;
}

export async function getCourseById(id: string): Promise<CourseWithModules> {
    const { data } = await api.get(`/courses/${id}`);
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
