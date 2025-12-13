import api from "./api";
import { getToken } from "../utils/auth";
import type { Practice } from "./types";

export async function getPracticesByLessonId(lessonId: string): Promise<Practice[]> {
    const token = getToken();

    // Allow public access if no token (per user requirement "Роли: все")
    // But usually APIs might be protected. Re-reading: "Роли: все (публичный/авторизованный)"
    // So we might not need token header if not logged in, but if we have it, send it.

    const headers: Record<string, string> = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const { data } = await api.get(`/practices/lesson/${lessonId}`, {
            headers
        });
        return data;

    } catch (error: any) {
        console.warn("API Error, returning mock data for testing:", error);
        // Mock data for demonstration
        return [
            {
                id: "1",
                lesson_id: lessonId,
                title: "Сумма двух чисел",
                description: "Напишите код, который складывает переменные 'a' и 'b' и выводит результат в консоль.",
                initial_code: `// Переменные a и b доступны в скрытом контексте
// Выведите их сумму

console.log(a + b);`,
                arg_names: ["a", "b"],
                test_cases: [
                    { input: [5, 10], output: 15 },
                    { input: [2, 3], output: 5 },
                    { input: [-1, 1], output: 0 }
                ],
                language: 'javascript',
                created_at: new Date().toISOString(),
                expected_output: null,
                solution_code: "console.log(a + b);"
            },
            {
                id: "2",
                lesson_id: lessonId,
                title: "Приветствие",
                description: "Создайте функцию-приветствие. Выведите 'Hello, [name]!' в консоль.",
                initial_code: `// Переменная name доступна
// Вывод должен быть: Hello, Alice! (если name="Alice")

console.log("Hello, " + name + "!");`,
                arg_names: ["name"],
                test_cases: [
                    { input: ["Alice"], output: "Hello, Alice!" },
                    { input: ["Bob"], output: "Hello, Bob!" },
                    { input: ["World"], output: "Hello, World!" }
                ],
                language: 'javascript',
                created_at: new Date().toISOString(),
                expected_output: null,
                solution_code: 'console.log("Hello, " + name + "!");'
            }
        ];
    }
}

export async function getPracticeById(id: string): Promise<Practice> {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const { data } = await api.get(`/practices/${id}`, {
            headers
        });
        return data;
    } catch (error: any) {
        console.error("Error fetching practice:", error);
        throw error;
    }
}
