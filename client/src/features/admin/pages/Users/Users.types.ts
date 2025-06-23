/**
 * @interface UsersProps
 * @description Props interface for the Users component
 */
export interface UsersProps {
    className?: string;
}

/**
 * @interface User
 * @description Interface for user data from API
 */
export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'user';
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * @interface UpdateUserData
 * @description Interface for updating user data
 */
export interface UpdateUserData {
    first_name?: string;
    last_name?: string;
    password?: string;
    role?: 'admin' | 'user';
}

/**
 * @interface UserCardProps
 * @description Props for individual user card component
 */
export interface UserCardProps {
    user: User;
    onUpdate: (userId: number, data: UpdateUserData) => Promise<void>;
    onDelete: (userId: number, userName: string) => void;
    isLoading?: 'update' | 'delete' | null;
}

/**
 * @interface FormErrors
 * @description Form validation errors
 */
export interface FormErrors {
    [key: string]: string;
}
