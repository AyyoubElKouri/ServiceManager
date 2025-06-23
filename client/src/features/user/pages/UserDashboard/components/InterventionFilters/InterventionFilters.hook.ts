import { useCallback } from 'react';
import { DASHBOARD_CONSTANTS } from '../../files/UserDashboard.constants';
import type { InterventionFiltersProps } from './InterventionFilters.types';

/**
 * @hook useInterventionFilters
 * @description Custom hook that contains all logic for the InterventionFilters component
 *
 * @param {InterventionFiltersProps} props - Props passed to the InterventionFilters component
 * @returns {Object} All data and functions needed by the InterventionFilters component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useInterventionFilters = (props: InterventionFiltersProps) => {
    const { filters, onFilterChange, onClearFilters } = props;

    const handleFilterChange = useCallback(
        (filterKey: keyof typeof filters, value: string) => {
            onFilterChange(filterKey, value);
        },
        [onFilterChange],
    );

    const handleClearFilters = useCallback(() => {
        onClearFilters();
    }, [onClearFilters]);

    return {
        filters,
        statusOptions: DASHBOARD_CONSTANTS.statusOptions,
        validatedOptions: DASHBOARD_CONSTANTS.validatedOptions,
        maintenanceTypes: DASHBOARD_CONSTANTS.maintenanceTypes,
        teams: DASHBOARD_CONSTANTS.teams,
        handleFilterChange,
        handleClearFilters,
    };
};
