export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        user_id: number; // если бэк возвращает числовой user_id
        full_name: string;
        email: string;
        role: string;
        created_at: string;
    };
    token: string;
}


export interface UserProfile {
    user_id: number;
    full_name: string;
    email: string;
    role: string;
    created_at: string;
}
export interface ApiError {
    message: string;
    statusCode?: number;
}
