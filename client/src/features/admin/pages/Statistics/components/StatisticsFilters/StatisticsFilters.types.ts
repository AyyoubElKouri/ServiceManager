import type { StatisticsFilters } from '../../files/Statistics.types';

/**
 * @interface StatisticsFiltersProps
 * @description Props interface for the StatisticsFilters component
 */
export interface StatisticsFiltersProps {
    filters: StatisticsFilters;
    onFiltersChange: (filters: StatisticsFilters) => void;
    teams: string[];
    sections: string[];
    maintenanceTypes: string[];
}
