import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../../../../shared/secureStorage';
import type { AdminDashboardProps, User } from './AdminDashboard.types';

/**
 * @hook useAdminDashboard
 * @description Custom hook that contains all logic for the AdminDashboard component
 *
 * @param {AdminDashboardProps} props - Props passed to the AdminDashboard component
 * @returns {Object} All data and functions needed by the AdminDashboard component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAdminDashboard = (props: AdminDashboardProps) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // Check authentication and authorization
    useEffect(() => {
        try {
            setIsLoading(true);
            
            // Get user data from storage
            const userData = getData<User>('user');
            
            if (!userData) {
                setError('Utilisateur non connecté');
                navigate('/login');
                return;
            }

            // Check if user is active
            if (!userData.active) {
                setError('Compte inactif');
                navigate('/inactive');
                return;
            }

            // Check if user is admin
            if (userData.role !== 'admin') {
                setError('Accès réservé aux administrateurs');
                return;
            }

            setUser(userData);
        } catch (err) {
            setError('Erreur lors de la vérification des permissions');
            console.error('Admin dashboard auth error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    return {
        isLoading,
        error,
        user,
    };
};
