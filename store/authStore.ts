import type {LoginRequest, UserProfile} from "../service/types";
import { create } from 'zustand';
import {getProfile, login, logout} from "../service/authService";
import {setToken} from "../src/utils/auth.ts";


interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;

    fetchProfile: () => Promise<void>;
    loginUser: (payload: LoginRequest) => Promise<void>;
    logoutUser: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const user = await getProfile();
            set({ user, loading: false });
        } catch (error: any) {
            set({
                user: null,
                loading: false,
                error: error?.message || 'Не удалось получить профиль',
            });
        }
    },
    loginUser: async (payload) => {
        set({ loading: true, error: null });
        try {
            const res = await login(payload); // login отправляет POST /auth/login
            const safeUser = {
                user_id: res.user.user_id,
                full_name: res.user.full_name,
                email: res.user.email,
                role: res.user.role,
                created_at: res.user.created_at,
            };
            set({ user: safeUser, loading: false });
            setToken(res.token)
        } catch (error: any) {
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
