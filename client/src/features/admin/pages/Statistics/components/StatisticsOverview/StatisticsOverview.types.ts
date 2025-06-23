import type { OverviewStats } from '../../files/Statistics.types';

/**
 * @interface StatisticsOverviewProps
 * @description Props interface for the StatisticsOverview component
 */
export interface StatisticsOverviewProps {
    stats: OverviewStats;
}

/**
 * @interface OverviewCard
 * @description Interface for overview card data
 */
export interface OverviewCard {
    title: string;
    value: number | string;
    description: string;
    icon: string;
    color: string;
    suffix?: string;
}
