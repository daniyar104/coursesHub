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

export async function getModuleTestResult(moduleId: string) {
    try {
        const res = await api.get(`/user/tests/module/${moduleId}/result`, {
            headers: authHeader(),
        });
        return res.data;
    } catch (e: any) {
        // 404 means no result found (test not taken/passed), which is fine
        if (e.response && e.response.status === 404) {
            return null;
        }
        console.error(`Error fetching module test result for ${moduleId}:`, e);
        return null;
    }
}

export async function getCourseTestResult(courseId: string) {
    try {
        const res = await api.get(`/user/tests/course/${courseId}/result`, {
            headers: authHeader(),
        });
        return res.data;
    } catch (e: any) {
        if (e.response && e.response.status === 404) {
            return null;
        }
        console.error(`Error fetching course test result for ${courseId}:`, e);
        return null;
    }
}

export async function getTestResult(testId: string) {
    try {
        const res = await api.get(`/user/tests/${testId}/result`, {
            headers: authHeader(),
        });
        return res.data;
    } catch (e: any) {
        if (e.response && e.response.status === 404) {
            return null;
        }
        console.error(`Error fetching test result for ${testId}:`, e);
        return null;
    }
}

