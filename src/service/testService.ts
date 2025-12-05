import { getToken } from '../utils/auth';
import api from './api';

function authHeader() {
    const token = getToken();
    if (!token) throw new Error('Необходима авторизация');
    return { Authorization: `Bearer ${token}` };
}

export async function getLessonTest(lessonId: string) {
    try {
        const res = await api.get(`/user/tests/lesson/${lessonId}`, {
            headers: authHeader(),
        });

        return res.data;
    } catch (e) {
        console.error(`Error:` + e);
    }
}

export async function getModuleTest(moduleId: string) {
    try {
        console.log(`Fetching test for module: ${moduleId}`);
        const res = await api.get(`/user/tests/module/${moduleId}`, {
            headers: authHeader(),
        });
        console.log(`Test for module ${moduleId}:`, res.data);
        return res.data;
    } catch (e) {
        console.error(`Error fetching module test for ${moduleId}:`, e);
    }
}

export async function getCourseTest(courseId: string) {
    try {
        const res = await api.get(`/user/tests/course/${courseId}`, {
            headers: authHeader(),
        });
        return res.data;
    } catch (e) {
        console.error(`Error:` + e);
    }
}

export async function submitTest(
    testId: string,
    answers: { questionId: string; answerId: string }[],
) {
    try {
        const res = await api.post(
            `/user/tests/${testId}/submit`,
            { answers },
            { headers: authHeader() },
        );
        return res.data;
    } catch (e) {
        console.error(e);
    }
}
