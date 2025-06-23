import { INTERVENTIONS_CONSTANTS } from './Interventions.constants';
import type { Intervention, InterventionsFilters } from './Interventions.types';

/**
 * @function filterInterventions
 * @description Filter interventions based on provided filters
 *
 * @param {Intervention[]} interventions - Array of interventions to filter
 * @param {InterventionsFilters} filters - Filter criteria
 * @returns {Intervention[]} Filtered interventions array
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const filterInterventions = (
    interventions: Intervention[],
    filters: InterventionsFilters,
): Intervention[] => {
    return interventions.filter((intervention) => {
        // Search term filter
        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            const matchesSearch =
                intervention.reference.toLowerCase().includes(searchTerm) ||
                intervention.post.toLowerCase().includes(searchTerm) ||
                intervention.team.toLowerCase().includes(searchTerm) ||
                intervention.section.name.toLowerCase().includes(searchTerm) ||
                intervention.comment.toLowerCase().includes(searchTerm) ||
                intervention.intervention_id.toString().includes(searchTerm);

            if (!matchesSearch) return false;
        }

        // Date range filters
        if (filters.dateFrom) {
            const interventionDate = new Date(intervention.date);
            const fromDate = new Date(filters.dateFrom);
            if (interventionDate < fromDate) return false;
        }

        if (filters.dateTo) {
            const interventionDate = new Date(intervention.date);
            const toDate = new Date(filters.dateTo);
            if (interventionDate > toDate) return false;
        }

        // Team filter
        if (filters.team && filters.team !== 'all') {
            if (intervention.team !== filters.team) return false;
        }

        // Maintenance type filter
        if (filters.maintenanceType && filters.maintenanceType !== 'all') {
            if (intervention.maintenance_type !== filters.maintenanceType) return false;
        }

        // Section filter
        if (filters.section && filters.section !== 'all') {
            if (intervention.section.name !== filters.section) return false;
        }

        return true;
    });
};

/**
 * @function formatDate
 * @description Format date string to French locale
 *
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR');
};

/**
 * @function formatTime
 * @description Format time string
 *
 * @param {string} timeString - Time string
 * @returns {string} Formatted time
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatTime = (timeString: string): string => {
    return timeString.slice(0, 5); // Remove seconds
};

/**
 * @function getMaintenanceTypeLabel
 * @description Get French label for maintenance type
 *
 * @param {string} type - Maintenance type
 * @returns {string} French label
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const getMaintenanceTypeLabel = (type: string): string => {
    return (
        INTERVENTIONS_CONSTANTS.maintenanceTypeLabels[
            type as keyof typeof INTERVENTIONS_CONSTANTS.maintenanceTypeLabels
        ] || type
    );
};
