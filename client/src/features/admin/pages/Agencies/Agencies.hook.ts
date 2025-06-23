import { useState, useEffect, useCallback } from 'react';
import { AGENCIES_CONSTANTS } from './Agencies.constants';
import type { AgenciesProps, Agency, CreateAgencyData, UpdateAgencyData } from './Agencies.types';

/**
 * @hook useAgencies
 * @description Custom hook that contains all logic for the Agencies component
 *
 * @param {AgenciesProps} props - Props passed to the Agencies component
 * @returns {Object} All data and functions needed by the Agencies component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAgencies = (props: AgenciesProps) => {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingActions, setLoadingActions] = useState<{
        [key: string]: 'update' | 'delete' | 'setCurrent' | null;
    }>({});
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        agencyId: string | null;
        agencyName: string;
    }>({
        isOpen: false,
        agencyId: null,
        agencyName: '',
    });

    // Fetch all agencies
    const fetchAgencies = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8000/api/agency');

            if (!response.ok) {
                throw new Error('Erreur lors du chargement des agences');
            }

            const result = await response.json();
            console.log('Agencies fetched raw response:', result); // Debug détaillé
            console.log('First agency structure:', result[0]); // Debug structure

            // Vérifier si result est un tableau ou un objet avec une propriété data
            const agencies = Array.isArray(result) ? result : result.data || [];
            console.log('Processed agencies:', agencies); // Debug après traitement

            setAgencies(agencies);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Create agency
    const handleCreateAgency = useCallback(
        async (createData: CreateAgencyData) => {
            try {
                setIsCreating(true);
                console.log('Creating agency with data:', createData);

                const response = await fetch('http://localhost:8000/api/agency', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(createData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error('Erreur lors de la création');
                }

                setShowCreateModal(false);
                await fetchAgencies();
            } catch (err) {
                console.error('Create agency error:', err);
                throw new Error(err instanceof Error ? err.message : 'Erreur lors de la création');
            } finally {
                setIsCreating(false);
            }
        },
        [fetchAgencies],
    );

    // Update agency
    const handleUpdateAgency = useCallback(
        async (agencyId: string, updateData: UpdateAgencyData) => {
            try {
                setLoadingActions((prev) => ({ ...prev, [agencyId]: 'update' }));
                console.log('Updating agency:', agencyId, 'with data:', updateData);

                // Filtrer les valeurs vides - le backend n'accepte que les champs avec des valeurs
                const cleanedData: any = {};
                if (updateData.name?.trim()) cleanedData.name = updateData.name.trim();
                if (updateData.adress?.trim()) cleanedData.adress = updateData.adress.trim();
                if (updateData.start_time?.trim())
                    cleanedData.start_time = updateData.start_time.trim();
                if (updateData.end_time?.trim()) cleanedData.end_time = updateData.end_time.trim();

                console.log('Cleaned data for update:', cleanedData);

                const response = await fetch(`http://localhost:8000/api/agency/${agencyId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cleanedData),
                });

                const responseText = await response.text();
                console.log('Update response status:', response.status);
                console.log('Update response text:', responseText);

                if (!response.ok) {
                    let errorData;
                    try {
                        errorData = JSON.parse(responseText);
                    } catch {
                        errorData = { message: responseText };
                    }
                    console.error('Update error response:', errorData);
                    throw new Error(errorData.message || 'Erreur lors de la mise à jour');
                }

                await fetchAgencies();
            } catch (err) {
                console.error('Update agency error:', err);
                throw new Error(
                    err instanceof Error ? err.message : 'Erreur lors de la mise à jour',
                );
            } finally {
                setLoadingActions((prev) => ({ ...prev, [agencyId]: null }));
            }
        },
        [fetchAgencies],
    );

    // Set current agency
    const handleSetCurrentAgency = useCallback(
        async (agencyId: string) => {
            try {
                setLoadingActions((prev) => ({ ...prev, [agencyId]: 'setCurrent' }));
                console.log('Setting current agency:', agencyId);

                const response = await fetch(
                    `http://localhost:8000/api/agency/${agencyId}/set-current`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );

                const responseText = await response.text();
                console.log('Set current response status:', response.status);
                console.log('Set current response text:', responseText);

                if (!response.ok) {
                    let errorData;
                    try {
                        errorData = JSON.parse(responseText);
                    } catch {
                        errorData = { message: responseText };
                    }
                    console.error('Set current error response:', errorData);
                    throw new Error(errorData.message || "Erreur lors de l'activation");
                }

                await fetchAgencies();
            } catch (err) {
                console.error('Set current agency error:', err);
                throw new Error(err instanceof Error ? err.message : "Erreur lors de l'activation");
            } finally {
                setLoadingActions((prev) => ({ ...prev, [agencyId]: null }));
            }
        },
        [fetchAgencies],
    );

    // Delete agency
    const handleDeleteAgency = useCallback(
        async (agencyId: string) => {
            try {
                setLoadingActions((prev) => ({ ...prev, [agencyId]: 'delete' }));
                console.log('Deleting agency:', agencyId);

                const response = await fetch(`http://localhost:8000/api/agency/${agencyId}`, {
                    method: 'DELETE',
                });

                const responseText = await response.text();
                console.log('Delete response status:', response.status);
                console.log('Delete response text:', responseText);

                if (!response.ok) {
                    let errorData;
                    try {
                        errorData = JSON.parse(responseText);
                    } catch {
                        errorData = { message: responseText };
                    }
                    console.error('Delete error response:', errorData);
                    throw new Error(errorData.message || 'Erreur lors de la suppression');
                }

                setConfirmModal({ isOpen: false, agencyId: null, agencyName: '' });
                await fetchAgencies();
            } catch (err) {
                console.error('Delete agency error:', err);
                throw new Error(
                    err instanceof Error ? err.message : 'Erreur lors de la suppression',
                );
            } finally {
                setLoadingActions((prev) => ({ ...prev, [agencyId]: null }));
            }
        },
        [fetchAgencies],
    );

    // Show delete confirmation
    const showDeleteConfirmation = useCallback((agencyId: string, agencyName: string) => {
        setConfirmModal({
            isOpen: true,
            agencyId,
            agencyName,
        });
    }, []);

    // Handle confirm delete
    const handleConfirmDelete = useCallback(() => {
        if (confirmModal.agencyId) {
            handleDeleteAgency(confirmModal.agencyId);
        }
    }, [confirmModal.agencyId, handleDeleteAgency]);

    // Handle cancel delete
    const handleCancelDelete = useCallback(() => {
        setConfirmModal({ isOpen: false, agencyId: null, agencyName: '' });
    }, []);

    // Modal handlers
    const handleOpenCreateModal = useCallback(() => {
        setShowCreateModal(true);
    }, []);

    const handleCloseCreateModal = useCallback(() => {
        setShowCreateModal(false);
    }, []);

    // Retry loading
    const handleRetry = useCallback(() => {
        fetchAgencies();
    }, [fetchAgencies]);

    // Initial load
    useEffect(() => {
        fetchAgencies();
    }, [fetchAgencies]);

    return {
        agencies,
        isLoading,
        error,
        loadingActions,
        showCreateModal,
        isCreating,
        confirmModal,
        handleCreateAgency,
        handleUpdateAgency,
        handleSetCurrentAgency,
        showDeleteConfirmation,
        handleConfirmDelete,
        handleCancelDelete,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleRetry,
        ...AGENCIES_CONSTANTS,
    };
};
