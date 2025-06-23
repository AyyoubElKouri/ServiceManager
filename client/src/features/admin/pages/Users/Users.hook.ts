import { useState, useEffect, useCallback } from 'react';
import { USERS_CONSTANTS } from './Users.constants';
import type { UsersProps, User, UpdateUserData } from './Users.types';

/**
 * @hook useUsers
 * @description Custom hook that contains all logic for the Users component
 *
 * @param {UsersProps} props - Props passed to the Users component
 * @returns {Object} All data and functions needed by the Users component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useUsers = (props: UsersProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingActions, setLoadingActions] = useState<{
        [key: number]: 'update' | 'delete' | null;
    }>({});
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        userId: number | null;
        userName: string;
    }>({
        isOpen: false,
        userId: null,
        userName: '',
    });

    // Fetch all users
    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8000/api/user');

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des utilisateurs');
            }

            const data = await response.json();
            setUsers(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Update user
    const handleUpdateUser = useCallback(
        async (userId: number, updateData: UpdateUserData) => {
            try {
                setLoadingActions((prev) => ({ ...prev, [userId]: 'update' }));

                const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la mise à jour');
                }

                // Refresh users list
                await fetchUsers();
            } catch (err) {
                throw new Error(
                    err instanceof Error ? err.message : 'Erreur lors de la mise à jour',
                );
            } finally {
                setLoadingActions((prev) => ({ ...prev, [userId]: null }));
            }
        },
        [fetchUsers],
    );

    // Delete user
    const handleDeleteUser = useCallback(
        async (userId: number) => {
            try {
                setLoadingActions((prev) => ({ ...prev, [userId]: 'delete' }));

                const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }

                // Close modal and refresh users list
                setConfirmModal({ isOpen: false, userId: null, userName: '' });
                await fetchUsers();
            } catch (err) {
                throw new Error(
                    err instanceof Error ? err.message : 'Erreur lors de la suppression',
                );
            } finally {
                setLoadingActions((prev) => ({ ...prev, [userId]: null }));
            }
        },
        [fetchUsers],
    );

    // Show delete confirmation
    const showDeleteConfirmation = useCallback((userId: number, userName: string) => {
        setConfirmModal({
            isOpen: true,
            userId,
            userName,
        });
    }, []);

    // Handle confirm delete
    const handleConfirmDelete = useCallback(() => {
        if (confirmModal.userId) {
            handleDeleteUser(confirmModal.userId);
        }
    }, [confirmModal.userId, handleDeleteUser]);

    // Handle cancel delete
    const handleCancelDelete = useCallback(() => {
        setConfirmModal({ isOpen: false, userId: null, userName: '' });
    }, []);

    // Retry loading
    const handleRetry = useCallback(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Initial load
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        isLoading,
        error,
        loadingActions,
        handleUpdateUser,
        showDeleteConfirmation,
        handleRetry,
        confirmModal,
        handleConfirmDelete,
        handleCancelDelete,
        ...USERS_CONSTANTS,
    };
};
