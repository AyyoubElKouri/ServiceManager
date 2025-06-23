/**
 * @interface AdminHeaderProps
 * @description Props interface for AdminHeader component
 */
export interface AdminHeaderProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
    className?: string;
}

/**
 * @interface User
 * @description User data interface
 */
export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    active: boolean;
}
