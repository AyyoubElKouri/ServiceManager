import { useState, useEffect, useCallback, useMemo } from 'react';
import { DASHBOARD_CONSTANTS } from './UserDashboard.constants';
import { filterInterventions, calculateStatistics } from './UserDashboard.util';
import { getData } from '/home/ayyoub/Projects/ServiceManager/client/src/shared/secureStorage.ts';
import type {
    UserDashboardProps,
    Intervention,
    InterventionFilters,
    DashboardStatistics,
    CreateInterventionData,
    User,
} from './UserDashboard.types';

/**
 * @hook useUserDashboard
 * @description Custom hook that contains all logic for the UserDashboard component
 *
 * @param {UserDashboardProps} props - Props passed to the UserDashboard component
 * @returns {Object} All data and functions needed by the UserDashboard component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useUserDashboard = (props: UserDashboardProps) => {
    // State
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // Filter state
    const [filters, setFilters] = useState<InterventionFilters>({
        searchTerm: '',
        dateFrom: '',
        dateTo: '',
        team: '',
        maintenanceType: '',
        status: 'all',
        validated: 'all',
    });

    // Modal state
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIntervention, setEditingIntervention] = useState<Intervention | null>(null);

    // Get user from secure storage
    useEffect(() => {
        const userData = getData<User>('user');
        if (userData) {
            setUser(userData);
        }
    }, []);

    // Fetch interventions
    const fetchInterventions = useCallback(async () => {
        if (!user) return;

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`http://localhost:8000/api/intervention/${user.id}`);

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des interventions');
            }

            const data = await response.json();
            setInterventions(data.interventions || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    // Initial load
    useEffect(() => {
        if (user) {
            fetchInterventions();
        }
    }, [user, fetchInterventions]);

    // Filtered interventions
    const filteredInterventions = useMemo(() => {
        return filterInterventions(interventions, filters);
    }, [interventions, filters]);

    // Statistics
    const statistics = useMemo(() => {
        return calculateStatistics(interventions);
    }, [interventions]);

    // Filter handlers
    const handleFilterChange = useCallback(
        (filterKey: keyof InterventionFilters, value: string) => {
            setFilters((prev) => ({
                ...prev,
                [filterKey]: value,
            }));
        },
        [],
    );

    const clearFilters = useCallback(() => {
        setFilters({
            searchTerm: '',
            dateFrom: '',
            dateTo: '',
            team: '',
            maintenanceType: '',
            status: 'all',
            validated: 'all',
        });
    }, []);

    // Modal handlers
    const handleOpenCreateModal = useCallback(() => {
        setShowCreateModal(true);
    }, []);

    const handleCloseCreateModal = useCallback(() => {
        setShowCreateModal(false);
    }, []);

    const handleOpenEditModal = useCallback((intervention: Intervention) => {
        setEditingIntervention(intervention);
        setShowEditModal(true);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setShowEditModal(false);
        setEditingIntervention(null);
    }, []);

    // CRUD operations
    const handleCreateIntervention = useCallback(
        async (data: CreateInterventionData) => {
            try {
                console.log('Creating intervention with data:', data);
                const response = await fetch('http://localhost:8000/api/intervention/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la création de l'intervention");
                }

                await fetchInterventions(); // Refresh data
                setShowCreateModal(false);
            } catch (err) {
                throw err;
            }
        },
        [fetchInterventions],
    );

    const handleEditIntervention = useCallback(
        async (data: CreateInterventionData) => {
            if (!user || !editingIntervention) return;

            console.log('Editing intervention with data:', data);

            try {
                const response = await fetch(
                    `http://localhost:8000/api/intervention/${user.id}/${editingIntervention.intervention_id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    },
                );

                if (!response.ok) {
                    throw new Error("Erreur lors de la modification de l'intervention");
                }

                await fetchInterventions(); // Refresh data
                setShowEditModal(false);
                setEditingIntervention(null);
            } catch (err) {
                throw err;
            }
        },
        [user, editingIntervention, fetchInterventions],
    );

    const handleSendIntervention = useCallback(
        async (interventionId: number) => {
            if (!user) return;

            try {
                
                const intervention = interventions.find(
                    (i) => i.intervention_id === interventionId,
                );
                if (!intervention) return;
                
                const updatedData = {
                    ...intervention,
                    validate: true,
                };

                delete updatedData.createdAt;
                delete updatedData.section;
                
                console.log('Sending intervention with data:', updatedData);
                
                const response = await fetch(
                    `http://localhost:8000/api/intervention/${user.id}/${interventionId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    },
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error("Erreur lors de l'envoi de l'intervention");
                }

                await fetchInterventions(); // Refresh data
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
            }
        },
        [user, interventions, fetchInterventions],
    );

    return {
        // Data
        interventions,
        filteredInterventions,
        statistics,
        isLoading,
        error,
        user,

        // Filter state
        filters,
        handleFilterChange,
        clearFilters,

        // Modal state
        showCreateModal,
        showEditModal,
        editingIntervention,

        // Actions
        handleCreateIntervention,
        handleEditIntervention,
        handleSendIntervention,
        handleCloseCreateModal,
        handleCloseEditModal,
        handleOpenCreateModal,
        handleOpenEditModal,

        // Content
        pageTitle: DASHBOARD_CONSTANTS.pageTitle,
        createButtonText: DASHBOARD_CONSTANTS.createButtonText,
        noDataMessage: DASHBOARD_CONSTANTS.noDataMessage,
    };
};
