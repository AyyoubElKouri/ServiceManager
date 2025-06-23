import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, removeData } from '../../../../../../shared/secureStorage';
import { HEADER_CONTENT, STORAGE_KEYS } from './UserHeader.constants';
import { getInitials, formatEmail, clearUserData } from './UserHeader.utils';
import type { UserHeaderProps, User } from './UserHeader.types';

/**
 * @hook useUserHeader
 * @description Custom hook that contains all logic for the UserHeader component
 */
export const useUserHeader = (props: UserHeaderProps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load user data on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getData(STORAGE_KEYS.user);
                if (userData && typeof userData === 'object' && 'email' in userData) {
                    setUser(userData as User);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error loading user:', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [navigate]);

    // Toggle dropdown
    const toggleDropdown = useCallback(() => {
        console.log('Toggle dropdown clicked');
        setIsDropdownOpen((prev) => {
            console.log('Dropdown state changing from', prev, 'to', !prev);
            return !prev;
        });
    }, []);

    // Handle logout
    const handleLogout = useCallback(() => {
        console.log('=== LOGOUT STARTED ===');

        try {
            // Clear storage
            removeData(STORAGE_KEYS.user);
            clearUserData();

            // Close dropdown
            setIsDropdownOpen(false);

            // Navigate to home
            navigate('/');

            console.log('=== LOGOUT COMPLETED ===');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/');
        }
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
        // Content
        ...HEADER_CONTENT,

        // State
        user,
        isDropdownOpen,
        isLoading,

        // Computed values
        userInitials: user ? getInitials(user) : '',
        formattedEmail: user ? formatEmail(user.email) : '',

        // Functions
        toggleDropdown,
        handleLogout,
    };
};
