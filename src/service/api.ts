import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { ApiError } from './types';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('VITE_API_URL is not defined');
}

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized request, user should login");
            // const { logoutUser } = useAuthStore.getState();
            // logoutUser();
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
