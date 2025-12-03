import api from "./api";
import { getToken, isTokenValid } from "../utils/auth";
import type { LessonMaterial } from "./types";

export async function getLessonMaterial(
    lessonId: string
): Promise<LessonMaterial> {
    const token = getToken();

    if (!token) {
        throw new Error("Необходима авторизация");
    }

    try {
        const { data } = await api.get(`/lessons/${lessonId}/material`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error: any) {
        console.error(
            "Error fetching lesson material:",
            error.response?.status,
            error.response?.data
        );
        throw error;
    }
}

// Отметить доступ к уроку (последний просмотренный урок)
export async function markLessonAccess(
    courseId: string,
    lessonId: string
): Promise<void> {
    const token = getToken();

    if (!token) {
        throw new Error("Необходима авторизация");
    }

    try {
        await api.post(
            `/courses/${courseId}/lessons/${lessonId}/access`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error: any) {
        console.error(
            "Error marking lesson access:",
            error.response?.status,
            error.response?.data
        );
        throw error;
    }
}

// Отметить урок как завершенный
export async function markLessonComplete(
    courseId: string,
    lessonId: string
): Promise<{ message: string; progress: number }> {
    const token = getToken();

    if (!token) {
        throw new Error("Необходима авторизация");
    }

    try {
        const { data } = await api.post(
            `/courses/${courseId}/lessons/${lessonId}/complete`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error: any) {
        console.error(
            "Error marking lesson complete:",
            error.response?.status,
            error.response?.data
        );
        throw error;
    }
}

export async function checkLastLessons() {
    const token = getToken();

    if (!token) {
        throw new Error("Необходима авторизация");
    }

    try {
        const res = await api.get("/courses/enrolled/with-last-lesson", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error: any) {
        console.error(
            "Error GET last-lesson",
            error.response?.status,
            error.response?.data
        );
        throw error;
    }
}
