/**
 * @interface InactiveUsersProps
 * @description Props interface for the InactiveUsers component
 */
export interface InactiveUsersProps {
    className?: string;
}

/**
 * @interface User
 * @description User data structure from API
 */
export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'user' | 'admin';
    active: boolean;
    agency_id: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * @interface UserCardProps
 * @description Props for individual user card component
 */
export interface UserCardProps {
    user: User;
    onActivate: (userId: number) => void;
    onDelete: (userId: number) => void;
    isLoading?: 'activate' | 'delete';
}
