import type { DashboardStatistics } from '../../files/UserDashboard.types';

/**
 * @interface DashboardStatsProps
 * @description Props interface for the DashboardStats component
 */
export interface DashboardStatsProps {
    statistics: DashboardStatistics;
}

/**
 * @interface StatCard
 * @description Interface for individual stat card data
 */
export interface StatCard {
    title: string;
    value: number | string;
    description: string;
    icon: string;
    color: string;
}
