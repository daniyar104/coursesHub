export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    firstName: string;
    surname: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        user_id: number; // если бэк возвращает числовой user_id
        firstName: string;
        surname: string;
        email: string;
        role: string;
        created_at: string;
    };
    token: string;
}


export interface UserProfile {
    user_id: number;
    firstName: string;
    surname: string;
    email: string;
    role: string;
    created_at: string;
}
export interface ApiError {
    message: string;
    statusCode?: number;
}

export interface Category {
    created_at: string
    description: string
    id: string
    name: string
}
export interface Course {
    avg_rating: string
    categories: Category[]
    category_id: string
    created_at: string
    difficulty_level: string
    full_description: string
    id: string
    review_count: number
    short_description: string
    title: string
    updated_at: string
}
