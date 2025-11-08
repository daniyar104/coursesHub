import {LoginRequest, UserProfile} from "../service/types";
import { create } from 'zustand';
import {getProfile, login, logout} from "../service/authService";


interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;

    fetchProfile: () => Promise<void>;
    loginUser: (payload: LoginRequest) => Promise<void>;
    logoutUser: () => Promise<void>;
}


export const userAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const user = await getProfile();
            set({ user, loading: false });
        } catch (error) {
            set({
                user: null,
                loading: false,
                error: error?.message || 'Не удалось получить профиль',
            });
        }
    },
    loginUser: async (payload) => {
        set({loading: true, error: null})
        try{
            const res = await login(payload);
            set({ user: res.user, loading: false });
        }catch (error){
            set({
                loading: false,
                error: error?.response?.data?.message || 'Ошибка входа',
            });
        }
    },

    logoutUser: async () => {
        try {
            await logout();
        } finally {
            set({ user: null });
        }
    },
}))
