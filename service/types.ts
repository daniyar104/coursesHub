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
    id: number;
    name: string;
    description?: string;
    slug: string; // например: "frontend", "backend", "design"
    icon?: React.ReactNode;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    author: string;
    authorImage?: string;
    image: string;
    duration: string;
    lessons: number;
    rating: number;
    students: number;
    category: string;
    price: number;
}


export interface PresentList {
    id: number;
    img: string;
    title: string;
    lessons: string;
    type: string;
    time: string;
}
