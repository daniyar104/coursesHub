export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user:{
        id: string;
        email: string;
        password: string;
    }
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}
