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
    avg_rating: string | number;
    difficulty_level: string;
    category_id: string;
    price?: number;
    image?: string;
    created_at: string;
    updated_at: string;
    _count?: {
        modules: number;
        lessons: number;
    };
}
export interface EnrolledCourse {
    id: string;
    title: string;
    categories: {
        id: string;
        name: string;
        description: string;
    };
    _count: {
        modules: number;
        lessons: number;
    };
    enrollment: {
        id: string;
        status: string; // "active", "completed", etc.
        progress: string; // как строка, поэтому преобразуем
        enrolled_at: string;
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
    material_url?: string; // добавить
    material_type?: 'PRESENTATION' | 'VIDEO' | 'OTHER'; // добавить
    position: number;
    created_at: string;
    updated_at: string;
    complete: boolean;
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
    completed?: boolean;  // All lessons in module completed
    progress?: number;    // Progress percentage 0-100
}

export interface CourseWithModules extends Course {
    modules: Module[];
    categories?: Category;
    reviews?: [];
}

// Teacher types
export interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    specialization: string[];
    avatar: string;
    email: string;
    phone: string;
    shortBio: string;
}

export interface Experience {
    id: string;
    position: string;
    organization: string;
    startDate: string;
    endDate?: string;
    description: string;
    current: boolean;
}

export interface Publication {
    id: string;
    title: string;
    type: 'article' | 'book' | 'conference' | 'journal';
    publisher: string;
    publishDate: string;
    url?: string;
    description: string;
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    imageUrl: string;
    credentialUrl?: string;
}

export interface TeacherDetail extends Teacher {
    fullBio: string;
    education: string[];
    experience: Experience[];
    publications: Publication[];
    certificates: Certificate[];
    coursesCount: number;
    studentsCount: number;
}

// Lesson Material types
export interface LessonMaterial {
    lessonId: string;
    title: string;
    materialUrl: string;
    expiresIn: number;
    courseId?: string; // ID курса для навигации
    complete?: boolean; // Урок завершен пользователем
}

// Enrollment Status types
export interface EnrollmentStatus {
    enrolled: boolean;
    enrollmentId?: string;
}

// TEST
export interface Answer {
    id: string;
    question_id: string;
    text: string;
    is_correct: boolean;
    created_at: string;
}

export interface Question {
    id: string;
    test_id: string;
    text: string;
    type: 'single_choice' | 'multiple_choice'; // можно расширить если будут другие типы
    created_at: string;
    answers: Answer[];
}

export interface Test {
    id: string;
    title: string;
    description: string | null;
    lesson_id: string | null;
    module_id: string | null;
    course_id: string | null;
    questions_to_show: number;
    passing_score: number;
    created_at: string;
    updated_at: string;
    questions: Question[];
}
