/**
 * @interface UserDashboardProps
 * @description Props interface for the UserDashboard component
 */
export interface UserDashboardProps {
    className?: string;
}

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
    comment: string | null;
    validate: boolean;
    section_id: number;
    user_id: number;
    createdAt?: string;
    section?: {
        name: string;
    };
}

/**
 * @interface InterventionFilters
 * @description Interface for intervention filtering options
 */
export interface InterventionFilters {
    searchTerm: string;
    dateFrom: string;
    dateTo: string;
    team: string;
    maintenanceType: string;
    status: string; // 'all' | 'sent' | 'saved'
    validated: string; // 'all' | 'true' | 'false'
}

/**
 * @interface DashboardStatistics
 * @description Interface for dashboard statistics
 */
export interface DashboardStatistics {
    totalInterventions: number;
    sentInterventions: number;
    savedInterventions: number;
    validatedInterventions: number;
    pendingInterventions: number;
    thisMonthInterventions: number;
}

/**
 * @interface CreateInterventionData
 * @description Interface for creating new intervention
 */
export interface CreateInterventionData {
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
    comment?: string;
    validate: boolean;
    section_id: number;
    user_id: number;
}

/**
 * @interface User
 * @description User data structure from secure storage
 */
export interface User {
    id: number;
    email: string;
    name?: string;
    role?: string;
}
