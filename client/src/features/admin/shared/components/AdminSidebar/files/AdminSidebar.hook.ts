import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS, SIDEBAR_CONSTANTS } from './AdminSidebar.constants';
import type { AdminSidebarProps } from './AdminSidebar.types';

/**
 * @hook useAdminSidebar
 * @description Custom hook that contains all logic for the AdminSidebar component
 *
 * @param {AdminSidebarProps} props - Props passed to the AdminSidebar component
 * @returns {Object} All data and functions needed by the AdminSidebar component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAdminSidebar = (props: AdminSidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * @function handleNavigation
     * @description Handle navigation to different admin routes
     */
    const handleNavigation = useCallback(
        (path: string) => {
            navigate(path);
            props.onClose(); // Close sidebar on mobile after navigation
        },
        [navigate, props],
    );

    return {
        navigationItems: NAVIGATION_ITEMS,
        currentPath: location.pathname,
        handleNavigation,
        title: SIDEBAR_CONSTANTS.title,
        footerText: SIDEBAR_CONSTANTS.footerText,
        footerIcon: SIDEBAR_CONSTANTS.footerIcon,
    };
};
