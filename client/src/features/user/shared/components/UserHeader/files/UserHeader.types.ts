/**
 * @interface UserHeaderProps
 * @description Props interface for the UserHeader component
 */
export interface UserHeaderProps {
    className?: string;
}

/**
 * @interface User
 * @description User data structure from secure storage
 */
export interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}