import type {
    Intervention,
    StatisticsData,
    OverviewStats,
    MaintenanceTypeStats,
    TeamStats,
    SectionStats,
    MonthlyStats,
    StatusStats,
    PerformanceStats,
    StatisticsFilters,
} from './Statistics.types';

/**
 * @function calculateDurationInHours
 * @description Calculate duration between start and end time in hours
 *
 * @param {string} startTime - Start time in HH:MM:SS format
 * @param {string} endTime - End time in HH:MM:SS format
 * @returns {number} Duration in hours
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateDurationInHours = (startTime: string, endTime: string): number => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    return (endMinutes - startMinutes) / 60;
};

/**
 * @function filterInterventions
 * @description Filter interventions based on provided filters
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @param {StatisticsFilters} filters - Filter criteria
 * @returns {Intervention[]} Filtered interventions
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const filterInterventions = (
    interventions: Intervention[],
    filters: StatisticsFilters,
): Intervention[] => {
    return interventions.filter((intervention) => {
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

        // Section filter
        if (filters.section && filters.section !== 'all') {
            if (intervention.section.name !== filters.section) return false;
        }

        // Maintenance type filter
        if (filters.maintenanceType && filters.maintenanceType !== 'all') {
            if (intervention.maintenance_type !== filters.maintenanceType) return false;
        }

        return true;
    });
};

/**
 * @function calculateStatistics
 * @description Calculate comprehensive statistics from interventions
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {StatisticsData} Complete statistics data
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateStatistics = (interventions: Intervention[]): StatisticsData => {
    const overview = calculateOverviewStats(interventions);
    const byMaintenanceType = calculateMaintenanceTypeStats(interventions);
    const byTeam = calculateTeamStats(interventions);
    const bySection = calculateSectionStats(interventions);
    const byMonth = calculateMonthlyStats(interventions);
    const byStatus = calculateStatusStats(interventions);
    const performance = calculatePerformanceStats(interventions);

    return {
        overview,
        byMaintenanceType,
        byTeam,
        bySection,
        byMonth,
        byStatus,
        performance,
    };
};

/**
 * @function calculateOverviewStats
 * @description Calculate general overview statistics
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {OverviewStats} Overview statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateOverviewStats = (interventions: Intervention[]): OverviewStats => {
    const totalInterventions = interventions.length;
    const validatedInterventions = interventions.filter((i) => i.validate).length;
    const pendingInterventions = totalInterventions - validatedInterventions;

    const totalHours = interventions.reduce((sum, intervention) => {
        return sum + calculateDurationInHours(intervention.start_time, intervention.end_time);
    }, 0);

    const averageDurationHours = totalInterventions > 0 ? totalHours / totalInterventions : 0;
    const completionRate =
        totalInterventions > 0 ? (validatedInterventions / totalInterventions) * 100 : 0;

    return {
        totalInterventions,
        validatedInterventions,
        pendingInterventions,
        averageDurationHours: Number(averageDurationHours.toFixed(2)),
        totalWorkHours: Number(totalHours.toFixed(2)),
        completionRate: Number(completionRate.toFixed(2)),
    };
};

/**
 * @function calculateMaintenanceTypeStats
 * @description Calculate statistics by maintenance type
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {MaintenanceTypeStats[]} Maintenance type statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateMaintenanceTypeStats = (
    interventions: Intervention[],
): MaintenanceTypeStats[] => {
    const typeMap = new Map<string, Intervention[]>();

    interventions.forEach((intervention) => {
        const type = intervention.maintenance_type;
        if (!typeMap.has(type)) {
            typeMap.set(type, []);
        }
        typeMap.get(type)!.push(intervention);
    });

    return Array.from(typeMap.entries()).map(([type, typeInterventions]) => {
        const count = typeInterventions.length;
        const validated = typeInterventions.filter((i) => i.validate).length;
        const percentage = (count / interventions.length) * 100;

        const totalDuration = typeInterventions.reduce((sum, intervention) => {
            return sum + calculateDurationInHours(intervention.start_time, intervention.end_time);
        }, 0);
        const averageDuration = count > 0 ? totalDuration / count : 0;

        return {
            type,
            count,
            percentage: Number(percentage.toFixed(2)),
            validated,
            averageDuration: Number(averageDuration.toFixed(2)),
        };
    });
};

/**
 * @function calculateTeamStats
 * @description Calculate statistics by team
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {TeamStats[]} Team statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateTeamStats = (interventions: Intervention[]): TeamStats[] => {
    const teamMap = new Map<string, Intervention[]>();

    interventions.forEach((intervention) => {
        const team = intervention.team;
        if (!teamMap.has(team)) {
            teamMap.set(team, []);
        }
        teamMap.get(team)!.push(intervention);
    });

    return Array.from(teamMap.entries()).map(([team, teamInterventions]) => {
        const count = teamInterventions.length;
        const validated = teamInterventions.filter((i) => i.validate).length;
        const completionRate = count > 0 ? (validated / count) * 100 : 0;

        const totalHours = teamInterventions.reduce((sum, intervention) => {
            return sum + calculateDurationInHours(intervention.start_time, intervention.end_time);
        }, 0);
        const averageDuration = count > 0 ? totalHours / count : 0;

        return {
            team,
            count,
            validated,
            totalHours: Number(totalHours.toFixed(2)),
            averageDuration: Number(averageDuration.toFixed(2)),
            completionRate: Number(completionRate.toFixed(2)),
        };
    });
};

/**
 * @function calculateSectionStats
 * @description Calculate statistics by section
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {SectionStats[]} Section statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateSectionStats = (interventions: Intervention[]): SectionStats[] => {
    const sectionMap = new Map<string, Intervention[]>();

    interventions.forEach((intervention) => {
        const section = intervention.section.name;
        if (!sectionMap.has(section)) {
            sectionMap.set(section, []);
        }
        sectionMap.get(section)!.push(intervention);
    });

    return Array.from(sectionMap.entries()).map(([section, sectionInterventions]) => {
        const count = sectionInterventions.length;
        const validated = sectionInterventions.filter((i) => i.validate).length;
        const percentage = (count / interventions.length) * 100;

        return {
            section,
            count,
            validated,
            percentage: Number(percentage.toFixed(2)),
        };
    });
};

/**
 * @function calculateMonthlyStats
 * @description Calculate monthly statistics
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {MonthlyStats[]} Monthly statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateMonthlyStats = (interventions: Intervention[]): MonthlyStats[] => {
    const monthMap = new Map<string, Intervention[]>();

    interventions.forEach((intervention) => {
        const date = new Date(intervention.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!monthMap.has(monthKey)) {
            monthMap.set(monthKey, []);
        }
        monthMap.get(monthKey)!.push(intervention);
    });

    return Array.from(monthMap.entries()).map(([month, monthInterventions]) => {
        const count = monthInterventions.length;
        const validated = monthInterventions.filter((i) => i.validate).length;
        const totalHours = monthInterventions.reduce((sum, intervention) => {
            return sum + calculateDurationInHours(intervention.start_time, intervention.end_time);
        }, 0);

        return {
            month,
            count,
            validated,
            totalHours: Number(totalHours.toFixed(2)),
        };
    });
};

/**
 * @function calculateStatusStats
 * @description Calculate status-based statistics
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {StatusStats} Status statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculateStatusStats = (interventions: Intervention[]): StatusStats => {
    const active = interventions.filter((i) => i.status).length;
    const inactive = interventions.length - active;
    const withPlanification = interventions.filter((i) => i.planification).length;
    const withReception = interventions.filter((i) => i.reception).length;

    return {
        active,
        inactive,
        withPlanification,
        withReception,
    };
};

/**
 * @function calculatePerformanceStats
 * @description Calculate performance metrics
 *
 * @param {Intervention[]} interventions - Array of interventions
 * @returns {PerformanceStats} Performance statistics
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const calculatePerformanceStats = (interventions: Intervention[]): PerformanceStats => {
    const durations = interventions.map((i) => calculateDurationInHours(i.start_time, i.end_time));

    const fastestIntervention = durations.length > 0 ? Math.min(...durations) : 0;
    const slowestIntervention = durations.length > 0 ? Math.max(...durations) : 0;

    // Calculate most productive team
    const teamStats = calculateTeamStats(interventions);
    const mostProductiveTeam = teamStats.reduce(
        (best, current) => (current.completionRate > best.completionRate ? current : best),
        teamStats[0] || { team: 'N/A', completionRate: 0 },
    ).team;

    // Calculate most active section
    const sectionStats = calculateSectionStats(interventions);
    const mostActiveSection = sectionStats.reduce(
        (best, current) => (current.count > best.count ? current : best),
        sectionStats[0] || { section: 'N/A', count: 0 },
    ).section;

    return {
        fastestIntervention: Number(fastestIntervention.toFixed(2)),
        slowestIntervention: Number(slowestIntervention.toFixed(2)),
        mostProductiveTeam,
        mostActiveSection,
    };
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
