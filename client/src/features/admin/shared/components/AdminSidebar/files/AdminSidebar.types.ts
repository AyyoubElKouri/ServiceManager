/**
 * @interface AdminSidebarProps
 * @description Props interface for AdminSidebar component
 */
export interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

/**
 * @interface NavigationItem
 * @description Navigation item interface
 */
export interface NavigationItem {
    path: string;
    label: string;
    icon: string;
}
