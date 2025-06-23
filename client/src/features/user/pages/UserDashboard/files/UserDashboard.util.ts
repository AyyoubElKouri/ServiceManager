import type { Intervention, InterventionFilters, DashboardStatistics } from './UserDashboard.types';

/**
 * @function filterInterventions
 * @description Filter interventions based on provided filters
 *
 * @param {Intervention[]} interventions - Array of interventions to filter
 * @param {InterventionFilters} filters - Filter criteria
 * @returns {Intervention[]} Filtered interventions array
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const filterInterventions = (
    interventions: Intervention[],
    filters: InterventionFilters,
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
                intervention.maintenance_type.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }

        // Date range filter
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

        // Status filter (sent/saved based on validate field)
        if (filters.status && filters.status !== 'all') {
            if (filters.status === 'sent' && !intervention.validate) return false;
            if (filters.status === 'saved' && intervention.validate) return false;
        }

        // Validated filter
        if (filters.validated && filters.validated !== 'all') {
            const isValidated = filters.validated === 'true';
            if (intervention.validate !== isValidated) return false;
        }

        return true;
    });
};

/**
 * @function calculateStatistics
 * @description Calculate dashboard statistics from interventions
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {DashboardStatistics} Calculated statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateStatistics = (interventions: Intervention[]): DashboardStatistics => {
    const totalInterventions = interventions.length;
    const sentInterventions = interventions.filter((i) => i.validate).length;
    const savedInterventions = interventions.filter((i) => !i.validate).length;
    const validatedInterventions = interventions.filter((i) => i.status).length;
    const pendingInterventions = interventions.filter((i) => !i.status).length;

    // This month interventions
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthInterventions = interventions.filter((i) => {
        const date = new Date(i.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    return {
        totalInterventions,
        sentInterventions,
        savedInterventions,
        validatedInterventions,
        pendingInterventions,
        thisMonthInterventions,
    };
};

/**
 * @function formatDate
 * @description Format date for display
 *
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Formatted date string
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * @function formatTime
 * @description Format time for display
 *
 * @param {string} timeString - Time string in HH:mm:ss format
 * @returns {string} Formatted time string
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatTime = (timeString: string): string => {
    return timeString.substring(0, 5); // Remove seconds
};

/**
 * @function getStatusLabel
 * @description Get status label in French
 *
 * @param {boolean} validate - Validation status
 * @returns {string} Status label
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const getStatusLabel = (validate: boolean): string => {
    return validate ? 'Envoyée' : 'Enregistrée';
};

/**
 * @function getMaintenanceTypeLabel
 * @description Get maintenance type label in French
 *
 * @param {string} type - Maintenance type
 * @returns {string} Type label
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const getMaintenanceTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
        coperative: 'Coopérative',
        preventive: 'Préventive',
        corrective: 'Corrective',
        urgente: 'Urgente',
    };
    return labels[type] || type;
};
