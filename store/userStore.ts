import { create } from "zustand";
import { getUserProfile } from "../service/userService";

interface UserStore {
    user: string[];
    loading: boolean;
    error: boolean;

    fetchGetUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: [],
    loading: false,
    error: false,

    fetchGetUser: async () => {
        set({ loading: true, error: false });
        try {
            const res = await getUserProfile();
            set({ loading: false, user: res, error: false });
        } catch (e: any) {
            set({ loading: false, error: true });
            console.error(e.message);
        }
    },
}));
