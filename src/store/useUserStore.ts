import { create } from 'zustand';
import type { UserProfile } from '../service/types';
import { userService } from '../service/userService';

interface UserStore {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: false,
    error: null,
    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const user = await userService.getCurrentUser();
            set({ user, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch user', loading: false });
        }
    },
}));
