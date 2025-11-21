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

export interface PresentList {
    id: number;
    img: string;
    title: string;
    lessons: string;
    type: string;
    time: string;
}

export interface Course {
    id: string;
    title: string;
    short_description: string;
    full_description?: string;
    review_count: number;
    avg_rating: number;
    difficulty_level: string;
    category_id: string;
    created_at: string;
    updated_at: string;
    _count?: {
        modules: number;
        lessons: number;
    };
}

export interface Category {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

export interface LessonTest {
    questions: {
        q: string;
        a: string[];
    }[];
}

export interface Lesson {
    id: string;
    module_id: string;
    title: string;
    content?: string;
    video_url?: string;
    image_url?: string;
    test?: LessonTest;
    position: number;
    created_at: string;
    updated_at: string;
}

export interface Module {
    id: string;
    course_id: string;
    title: string;
    description?: string;
    position: number;
    created_at: string;
    updated_at: string;
    lessons: Lesson[];
}

export interface CourseWithModules extends Course {
    modules: Module[];
    categories?: Category;
    reviews?: [];
}
