import { create } from 'zustand';
import { checkLastLessons, markLessonAccess, markLessonComplete } from '../service/lessonService';
import type { Course, Lesson } from '../service/types';

interface CompleteState {
    message: string;
    progress: number;
}

interface LessonState {
    complete: CompleteState[];
    loading: boolean;
    error: boolean;
    lastCourse: Course[];

    fetchCompleteLesson: (courseId: string, lessonId: string) => Promise<CompleteState | null>;

    fetchMarkLessonAccess: (courseId: string, lessonId: string) => Promise<void>;

    fetchLastCourse: () => Promise<void>;
}

export const useLessonStore = create<LessonState>((set) => ({
    complete: [],
    loading: false,
    error: false,
    lastCourse: [],

    fetchCompleteLesson: async (courseId: string, lessonId: string) => {
        set({ loading: true, error: false });

        try {
            const res: CompleteState = await markLessonComplete(courseId, lessonId);
            set((state) => ({
                complete: [...state.complete, res],
                loading: false,
            }));
            return res;
        } catch (error) {
            set({ error: true, loading: false });
            return null;
        }
    },

    fetchMarkLessonAccess: async (courseId: string, lessonId: string) => {
        set({ loading: true, error: false });

        try {
            await markLessonAccess(courseId, lessonId);
            set({ loading: false });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },

    fetchLastCourse: async () => {
        set({ loading: true, error: false });

        try {
            const res = await checkLastLessons();

            if (!res) {
                set({ loading: false });
                return;
            }

            set({
                loading: false,
                lastCourse: res.filter((el) => el.lastLesson?.enrollment?.progress !== '100'),
                // lastCourse: res.data,
            });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },
}));
