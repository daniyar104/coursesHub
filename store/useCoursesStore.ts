// store/coursesStore.ts
import { create } from "zustand";
import { getAll } from "../service/coursesService";
import type {Course} from "../service/types.ts";


interface CoursesStore {
    courses: Course[];
    loading: boolean;
    error: boolean;
    getAll: () => Promise<void>;
}

export const useCoursesStore = create<CoursesStore>((set) => ({
    courses: [],
    loading: false,
    error: false,
    getAll: async () => {
        set({ loading: true, error: false });
        try {
            const res = await getAll();
            set({ courses: res.data, loading: false });
        } catch (e) {
            console.error(e);
            set({ error: true, loading: false });
        }
    },
}));
