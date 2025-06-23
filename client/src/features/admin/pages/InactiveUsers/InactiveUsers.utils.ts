import type { User } from './InactiveUsers.types';

/**
 * @function getInitials
 * @description Get user initials from first and last name
 * @param {User} user - User object
 * @returns {string} User initials
 */
export const getInitials = (user: User): string => {
    const firstInitial = user.first_name?.charAt(0).toUpperCase() || '';
    const lastInitial = user.last_name?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
};

/**
 * @function formatDate
 * @description Format date for display
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch (error) {
        return 'Date invalide';
    }
};

/**
 * @function getFullName
 * @description Get full name from first and last name
 * @param {User} user - User object
 * @returns {string} Full name
 */
export const getFullName = (user: User): string => {
    return `${user.first_name} ${user.last_name}`.trim();
};

/**
 * @function filterInactiveUsers
 * @description Filter users to get only inactive ones
 * @param {User[]} users - Array of users
 * @returns {User[]} Filtered inactive users
 */
export const filterInactiveUsers = (users: User[]): User[] => {
    return users.filter((user) => !user.active);
};
