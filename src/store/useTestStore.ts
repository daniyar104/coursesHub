import { create } from 'zustand';
import type { Test } from '../service/types';
import { getCourseTest, getLessonTest, getModuleTest, submitTest } from '../service/testService';

interface TestState {
    currentTest: Test | null;
    answers: Record<string, string>;
    loading: boolean;
    error: boolean;
    result: { score: number; passed: boolean } | null;

    fetchLessonTest: (id: string) => Promise<void>;
    fetchModuleTest: (id: string) => Promise<void>;
    fetchCourseTest: (id: string) => Promise<void>;

    submitTest: () => Promise<void>;
    setAnswer: (questionId: string, answerId: string) => void;
}

export const useTestStore = create<TestState>((set, get) => ({
    currentTest: null,
    answers: {},
    loading: false,
    error: false,
    result: null,

    fetchLessonTest: async (id) => {
        set({ loading: true, error: false });
        try {
            let res = await getLessonTest(id);

            set({ currentTest: res, loading: false });
        } catch {
            set({ error: true, loading: false });
        }
    },
    fetchModuleTest: async (id) => {
        set({ loading: true, error: false });
        try {
            let res = await getModuleTest(id);

            set({ currentTest: res, loading: false });
        } catch {
            set({ error: true, loading: false });
        }
    },
    fetchCourseTest: async (id) => {
        set({ loading: true, error: false });
        try {
            let res = await getCourseTest(id);

            set({ currentTest: res, loading: false });
        } catch {
            set({ error: true, loading: false });
        }
    },

    submitTest: async () => {
        const { currentTest, answers } = get();
        if (!currentTest) return;

        set({ loading: true, error: false });
        try {
            const res = await submitTest(
                currentTest.id,
                Object.entries(answers).map(([questionId, answerId]) => ({ questionId, answerId })),
            );
            set({ result: res, loading: false });
        } catch {
            set({ error: true, loading: false });
        }
    },

    setAnswer: (questionId, answerId) => {
        set((state) => ({ answers: { ...state.answers, [questionId]: answerId } }));
    },
}));
