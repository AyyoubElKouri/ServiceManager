import type { User } from './UserHeader.types';

/**
 * @function getInitials
 * @description Get user initials from email or name
 * @param {User} user - User object
 * @returns {string} User initials
 */
export const getInitials = (user: User): string => {
    if (user.name) {
        return user.name
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    }

    return user.email.charAt(0).toUpperCase();
};

/**
 * @function formatEmail
 * @description Format email for display (truncate if too long)
 * @param {string} email - User email
 * @returns {string} Formatted email
 */
export const formatEmail = (email: string): string => {
    if (email.length > 25) {
        const [localPart, domain] = email.split('@');
        return `${localPart.substring(0, 10)}...@${domain}`;
    }
    return email;
};

/**
 * @function clearUserData
 * @description Clear all user-related data from storage
 */
export const clearUserData = (): void => {
    try {
        // Clear any additional user-related data if needed
        console.log('clearUserData: Clearing additional user data...');

        // You can add other cleanup logic here
        // For example: clear auth tokens, user preferences, etc.

        console.log('clearUserData: User data cleared successfully');
    } catch (error) {
        console.error('clearUserData: Error clearing user data:', error);
    }
};
