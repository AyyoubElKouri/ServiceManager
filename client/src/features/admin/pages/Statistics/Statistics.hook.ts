import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Intervention, StatisticsData, StatisticsFilters } from './files/Statistics.types';
import { calculateStatistics, filterInterventions } from './files/Statistics.util';

/**
 * @hook useStatistics
 * @description Custom hook that contains all logic for the Statistics component
 *
 * @returns {Object} All data and functions needed by the Statistics component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useStatistics = () => {
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<StatisticsFilters>({
        dateFrom: '',
        dateTo: '',
        team: 'all',
        section: 'all',
        maintenanceType: 'all',
    });

    const fetchInterventions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8000/api/intervention');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched interventions:', data);
            setInterventions(data);
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

    const filteredInterventions = useMemo(() => {
        return filterInterventions(interventions, filters);
    }, [interventions, filters]);

    const statisticsData = useMemo((): StatisticsData | null => {
        if (filteredInterventions.length === 0) return null;
        return calculateStatistics(filteredInterventions);
    }, [filteredInterventions]);

    const uniqueTeams = useMemo(() => {
        const teams = [...new Set(interventions.map((i) => i.team))];
        return teams.sort();
    }, [interventions]);

    const uniqueSections = useMemo(() => {
        const sections = [...new Set(interventions.map((i) => i.section.name))];
        return sections.sort();
    }, [interventions]);

    const uniqueMaintenanceTypes = useMemo(() => {
        const types = [...new Set(interventions.map((i) => i.maintenance_type))];
        return types.sort();
    }, [interventions]);

    const handleFiltersChange = useCallback((newFilters: StatisticsFilters) => {
        setFilters(newFilters);
    }, []);

    const handleRetry = useCallback(() => {
        fetchInterventions();
    }, [fetchInterventions]);

    return {
        interventions: filteredInterventions,
        statisticsData,
        loading,
        error,
        filters,
        uniqueTeams,
        uniqueSections,
        uniqueMaintenanceTypes,
        handleFiltersChange,
        handleRetry,
    };
};
