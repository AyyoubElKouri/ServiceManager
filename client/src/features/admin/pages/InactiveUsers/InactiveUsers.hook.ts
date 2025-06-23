import { useState, useEffect, useCallback } from 'react';
import { INACTIVE_USERS_CONSTANTS } from './InactiveUsers.constants';
import { filterInactiveUsers } from './InactiveUsers.utils';
import type { InactiveUsersProps, User } from './InactiveUsers.types';

/**
 * @hook useInactiveUsers
 * @description Custom hook that contains all logic for the InactiveUsers component
 *
 * @param {InactiveUsersProps} props - Props passed to the InactiveUsers component
 * @returns {Object} All data and functions needed by the InactiveUsers component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useInactiveUsers = (props: InactiveUsersProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingActions, setLoadingActions] = useState<Record<number, 'activate' | 'delete'>>({});

    // Fetch all users
    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(INACTIVE_USERS_CONSTANTS.apiEndpoints.getUsers);

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des utilisateurs');
            }

            const data = await response.json();
            const allUsers = Array.isArray(data) ? data : [];
            const inactive = filterInactiveUsers(allUsers);

            setUsers(allUsers);
            setInactiveUsers(inactive);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : INACTIVE_USERS_CONSTANTS.messages.fetchError,
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Activate user
    const handleActivateUser = useCallback(async (userId: number) => {
        try {
            setLoadingActions((prev) => ({ ...prev, [userId]: 'activate' }));

            const response = await fetch(
                INACTIVE_USERS_CONSTANTS.apiEndpoints.activateUser(userId),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Erreur lors de l'activation");
            }

            // Remove user from inactive list
            setInactiveUsers((prev) => prev.filter((user) => user.user_id !== userId));

            // Update users list
            setUsers((prev) =>
                prev.map((user) => (user.user_id === userId ? { ...user, active: true } : user)),
            );

            console.log(INACTIVE_USERS_CONSTANTS.messages.activateSuccess);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : INACTIVE_USERS_CONSTANTS.messages.activateError,
            );
        } finally {
            setLoadingActions((prev) => {
                const newState = { ...prev };
                delete newState[userId];
                return newState;
            });
        }
    }, []);

    // Delete user
    const handleDeleteUser = useCallback(async (userId: number) => {
        try {
            setLoadingActions((prev) => ({ ...prev, [userId]: 'delete' }));

            const response = await fetch(INACTIVE_USERS_CONSTANTS.apiEndpoints.deleteUser(userId), {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            // Remove user from both lists
            setInactiveUsers((prev) => prev.filter((user) => user.user_id !== userId));
            setUsers((prev) => prev.filter((user) => user.user_id !== userId));

            console.log(INACTIVE_USERS_CONSTANTS.messages.deleteSuccess);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : INACTIVE_USERS_CONSTANTS.messages.deleteError,
            );
        } finally {
            setLoadingActions((prev) => {
                const newState = { ...prev };
                delete newState[userId];
                return newState;
            });
        }
    }, []);

    // Retry function
    const handleRetry = useCallback(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        // Data
        inactiveUsers,
        isLoading,
        error,
        loadingActions,

        // Actions
        handleActivateUser,
        handleDeleteUser,
        handleRetry,

        // Constants
        pageTitle: INACTIVE_USERS_CONSTANTS.pageTitle,
        subtitle: INACTIVE_USERS_CONSTANTS.subtitle,
        noDataMessage: INACTIVE_USERS_CONSTANTS.noDataMessage,
        loadingMessage: INACTIVE_USERS_CONSTANTS.loadingMessage,
        buttons: INACTIVE_USERS_CONSTANTS.buttons,
        roleLabels: INACTIVE_USERS_CONSTANTS.roleLabels,
    };
};
