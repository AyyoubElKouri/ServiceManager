/**
 * @interface InterventionsProps
 * @description Props interface for the Interventions component
 */
export interface InterventionsProps {}

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
 * @interface InterventionsFilters
 * @description Interface for filtering interventions
 */
export interface InterventionsFilters {
    searchTerm: string;
    dateFrom: string;
    dateTo: string;
    team: string;
    maintenanceType: string;
    section: string;
}
