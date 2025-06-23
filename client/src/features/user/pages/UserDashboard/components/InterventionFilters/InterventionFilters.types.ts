import type { InterventionFilters } from '../../files/UserDashboard.types';

/**
 * @interface InterventionFiltersProps
 * @description Props interface for the InterventionFilters component
 */
export interface InterventionFiltersProps {
    filters: InterventionFilters;
    onFilterChange: (filterKey: keyof InterventionFilters, value: string) => void;
    onClearFilters: () => void;
}
