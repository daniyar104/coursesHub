import api from './api';
import type { UserProfile } from './types';
import { getToken } from '../utils/auth';

export const userService = {
    getCurrentUser: async (): Promise<UserProfile> => {
        try {
            const token = getToken();
            if (!token) throw new Error('No token found');

            const { data } = await api.get<UserProfile>('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data;
        } catch (error: any) {
            console.error('Failed to fetch user:', error);
            throw error;
        }
    },
};
