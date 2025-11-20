import api from "./api";
import type {LoginRequest, LoginResponse, RegisterRequest, UserProfile} from "./types";


export async function login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
}
export async function register(payload: RegisterRequest): Promise<LoginResponse> {
    const {data} = await api.post<LoginResponse>('/auth/register', payload);
    return data;
}

export async function getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>('/user/profile');
    return data;
}

export async function logout(): Promise<void> {
    await api.post('/auth/logout');
}
