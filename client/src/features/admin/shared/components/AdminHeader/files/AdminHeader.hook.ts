import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, removeData } from '../../../../../../shared/secureStorage';
import { HEADER_CONSTANTS } from './AdminHeader.constants';
import type { AdminHeaderProps, User } from './AdminHeader.types';

/**
 * @hook useAdminHeader
 * @description Custom hook that contains all logic for the AdminHeader component
 *
 * @param {AdminHeaderProps} props - Props passed to the AdminHeader component
 * @returns {Object} All data and functions needed by the AdminHeader component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAdminHeader = (props: AdminHeaderProps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Load user data on mount
    useEffect(() => {
        const userData = getData<User>('user');
        if (userData) {
            setUser(userData);
        }
    }, []);

    /**
     * @function getInitials
     * @description Get user initials from first and last name
     *
     * @param {User} user - User object
     * @returns {string} User initials
     */
    const getInitials = useCallback((user: User): string => {
        return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
    }, []);

    /**
     * @function formatEmail
     * @description Format email for display
     *
     * @param {string} email - Email to format
     * @returns {string} Formatted email
     */
    const formatEmail = useCallback((email: string): string => {
        if (email.length > 20) {
            return email.substring(0, 17) + '...';
        }
        return email;
    }, []);

    /**
     * @function toggleDropdown
     * @description Toggle dropdown menu visibility
     */
    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
    }, []);

    /**
     * @function handleLogout
     * @description Handle user logout
     */
    const handleLogout = useCallback(() => {
        removeData('user');
        removeData('authToken');
        setIsDropdownOpen(false);
        navigate('/');
    }, [navigate]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isDropdownOpen]);

    return {
        user,
        isDropdownOpen,
        userInitials: user ? getInitials(user) : '',
        formattedEmail: user ? formatEmail(user.email) : '',
        companyName: HEADER_CONSTANTS.companyName,
        logoPath: HEADER_CONSTANTS.logoPath,
        toggleDropdown,
        handleLogout,
    };
};
