import { useCallback } from 'react';
import type { StatisticsFiltersProps } from './StatisticsFilters.types';
import type { StatisticsFilters } from '../../files/Statistics.types';

/**
 * @hook useStatisticsFilters
 * @description Custom hook that contains all logic for the StatisticsFilters component
 *
 * @param {StatisticsFiltersProps} props - Props passed to the StatisticsFilters component
 * @returns {Object} All data and functions needed by the StatisticsFilters component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useStatisticsFilters = (props: StatisticsFiltersProps) => {
    const { filters, onFiltersChange, teams, sections, maintenanceTypes } = props;

    const handleFilterChange = useCallback(
        (field: keyof StatisticsFilters, value: string) => {
            onFiltersChange({
                ...filters,
                [field]: value,
            });
        },
        [filters, onFiltersChange],
    );

    return {
        filters,
        handleFilterChange,
        teams,
        sections,
        maintenanceTypes,
    };
};
