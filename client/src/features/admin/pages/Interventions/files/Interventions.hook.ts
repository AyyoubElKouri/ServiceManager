import { useState, useEffect, useCallback, useMemo } from 'react';
import { filterInterventions } from './Interventions.util';
import type { Intervention, InterventionsFilters, InterventionsProps } from './Interventions.types';

/**
 * @hook useInterventions
 * @description Custom hook that contains all logic for the Interventions page
 *
 * @param {InterventionsProps} props - Props passed to the Interventions page
 * @returns {Object} All data and functions needed by the Interventions page
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useInterventions = (props: InterventionsProps) => {
    // State
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters state
    const [filters, setFilters] = useState<InterventionsFilters>({
        searchTerm: '',
        dateFrom: '',
        dateTo: '',
        team: 'all',
        maintenanceType: 'all',
        section: 'all',
    });

    // Fetch interventions from API
    const fetchInterventions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8000/api/intervention');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Intervention[] = await response.json();

            // Sort by createdAt (most recent first) - show all interventions, not just validated
            const sortedInterventions = data.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );

            setInterventions(sortedInterventions);
        } catch (err) {
            console.error('Error fetching interventions:', err);
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInterventions();
    }, [fetchInterventions]);

    // Filtered interventions (maintain the sorting)
    const filteredInterventions = useMemo(() => {
        const filtered = filterInterventions(interventions, filters);
        // Keep the sorting by createdAt (most recent first)
        return filtered.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }, [interventions, filters]);

    // Statistics
    const statistics = useMemo(() => {
        const total = filteredInterventions.length;
        const activeInterventions = filteredInterventions.filter((i) => i.status).length;
        const validatedInterventions = filteredInterventions.filter((i) => i.validate).length;
        const uniqueTeams = new Set(filteredInterventions.map((i) => i.team)).size;
        const uniqueSections = new Set(filteredInterventions.map((i) => i.section.name)).size;

        return {
            total,
            active: activeInterventions,
            validated: validatedInterventions,
            teams: uniqueTeams,
            sections: uniqueSections,
        };
    }, [filteredInterventions]);

    // Get unique values for filters
    const uniqueTeams = useMemo(() => {
        return Array.from(new Set(interventions.map((i) => i.team))).sort();
    }, [interventions]);

    const uniqueMaintenanceTypes = useMemo(() => {
        return Array.from(new Set(interventions.map((i) => i.maintenance_type))).sort();
    }, [interventions]);

    const uniqueSections = useMemo(() => {
        return Array.from(new Set(interventions.map((i) => i.section.name))).sort();
    }, [interventions]);

    // Filter handlers
    const handleFilterChange = useCallback(
        (filterKey: keyof InterventionsFilters, value: string) => {
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
            team: 'all',
            maintenanceType: 'all',
            section: 'all',
        });
    }, []);

    return {
        // Data
        interventions: filteredInterventions,
        loading,
        error,
        statistics,

        // Filters
        filters,
        uniqueTeams,
        uniqueMaintenanceTypes,
        uniqueSections,
        handleFilterChange,
        clearFilters,

        // Actions
        refetch: fetchInterventions,
    };
};
