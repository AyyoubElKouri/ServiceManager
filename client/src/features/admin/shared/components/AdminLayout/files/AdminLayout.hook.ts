import { useState, useCallback } from 'react';
import type { AdminLayoutProps } from './AdminLayout.types';

/**
 * @hook useAdminLayout
 * @description Custom hook that contains all logic for the AdminLayout component
 *
 * @param {AdminLayoutProps} props - Props passed to the AdminLayout component
 * @returns {Object} All data and functions needed by the AdminLayout component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAdminLayout = (props: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    /**
     * @function toggleSidebar
     * @description Toggle sidebar open/close state
     */
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    /**
     * @function closeSidebar
     * @description Close sidebar
     */
    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    return {
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
    };
};
