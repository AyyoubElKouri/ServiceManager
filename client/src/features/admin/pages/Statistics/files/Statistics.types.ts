/**
 * @interface Intervention
 * @description Interface for intervention data from API
 */
export interface Intervention {
    intervention_id: number;
    date: string;
    team: string;
    reference: string;
    post: string;
    maintenance_type: string;
    status: boolean;
    work_order_number: number;
    work_autorisation_number: number;
    planification: boolean;
    reception: boolean;
    start_time: string;
    end_time: string;
    comment: string;
    validate: boolean;
    section_id: number;
    user_id: number;
    createdAt: string;
    section: {
        name: string;
    };
}

/**
 * @interface StatisticsData
 * @description Complete statistics data structure
 */
export interface StatisticsData {
    overview: OverviewStats;
    byMaintenanceType: MaintenanceTypeStats[];
    byTeam: TeamStats[];
    bySection: SectionStats[];
    byMonth: MonthlyStats[];
    byStatus: StatusStats;
    performance: PerformanceStats;
}

/**
 * @interface OverviewStats
 * @description General overview statistics
 */
export interface OverviewStats {
    totalInterventions: number;
    validatedInterventions: number;
    pendingInterventions: number;
    averageDurationHours: number;
    totalWorkHours: number;
    completionRate: number;
}

/**
 * @interface MaintenanceTypeStats
 * @description Statistics by maintenance type
 */
export interface MaintenanceTypeStats {
    type: string;
    count: number;
    percentage: number;
    validated: number;
    averageDuration: number;
}

/**
 * @interface TeamStats
 * @description Statistics by team
 */
export interface TeamStats {
    team: string;
    count: number;
    validated: number;
    totalHours: number;
    averageDuration: number;
    completionRate: number;
}

/**
 * @interface SectionStats
 * @description Statistics by section
 */
export interface SectionStats {
    section: string;
    count: number;
    validated: number;
    percentage: number;
}

/**
 * @interface MonthlyStats
 * @description Monthly statistics
 */
export interface MonthlyStats {
    month: string;
    count: number;
    validated: number;
    totalHours: number;
}

/**
 * @interface StatusStats
 * @description Status-based statistics
 */
export interface StatusStats {
    active: number;
    inactive: number;
    withPlanification: number;
    withReception: number;
}

/**
 * @interface PerformanceStats
 * @description Performance metrics
 */
export interface PerformanceStats {
    fastestIntervention: number;
    slowestIntervention: number;
    mostProductiveTeam: string;
    mostActiveSection: string;
}

/**
 * @interface StatisticsFilters
 * @description Filters for statistics
 */
export interface StatisticsFilters {
    dateFrom: string;
    dateTo: string;
    team: string;
    section: string;
    maintenanceType: string;
}
