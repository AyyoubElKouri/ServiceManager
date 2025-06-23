/**
 * @interface AdminDashboardProps
 * @description Props for the AdminDashboard component
 */
export interface AdminDashboardProps {
    className?: string;
}

/**
 * @interface User
 * @description User data structure
 */
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    active: boolean;
}
