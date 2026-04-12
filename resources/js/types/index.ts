export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface SchoolProfile {
    id: number;
    name: string | null;
    principal_name: string;
    principal_message: string;
    description: string | null;
    address: string | null;
    logo: string | null;
    principal_photo: string | null;
    total_students: number;
    total_teachers: number;
    total_classes: number;
    total_achievements: number;
    male_students: number;
    female_students: number;
    logo_url: string | null;
    principal_photo_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface VisionMission {
    id: number;
    vision: string;
    mission: string;
    image: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface SchoolTimeline {
    id: number;
    year: string;
    title: string;
    description: string | null;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Teacher {
    id: number;
    name: string;
    role: 'principal' | 'teacher' | 'staff';
    image: string | null;
    position: string | null;
    class: string | null;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface News {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    image: string | null;
    image_url: string | null;
    category: 'Akademik' | 'Non Akademik';
    created_at: string;
    updated_at: string;
}

export interface Gallery {
    id: number;
    image: string;
    title: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Facility {
    id: number;
    name: string;
    slug: string;
    category: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface RoomFacility {
    id: number;
    name: string;
    icon_key: string | null;
    description: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface ClassDistribution {
    id: number;
    class_name: string;
    total_students: number;
    created_at: string;
    updated_at: string;
}

export interface AcademicContent {
    id: number;
    title: string;
    description: string;
    image: string | null;
    image_url: string | null;
    type: 'kurikulum' | 'lainnya';
    created_at: string;
    updated_at: string;
}

export interface Program {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    image_url: string | null;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Extracurricular {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface DashboardStats {
    total_students: number;
    total_teachers: number;
    total_classes: number;
    total_achievements: number;
    total_galleries: number;
    total_messages: number;
    unread_messages: number;
}

export interface ChartDataPoint {
    date: string;
    count: number;
}
