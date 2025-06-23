import { useMemo } from 'react';
import type { StatisticsOverviewProps, OverviewCard } from './StatisticsOverview.types';

/**
 * @hook useStatisticsOverview
 * @description Custom hook that contains all logic for the StatisticsOverview component
 *
 * @param {StatisticsOverviewProps} props - Props passed to the StatisticsOverview component
 * @returns {Object} All data and functions needed by the StatisticsOverview component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useStatisticsOverview = (props: StatisticsOverviewProps) => {
    const { stats } = props;

    const overviewCards = useMemo(
        (): OverviewCard[] => [
            {
                title: 'Total Interventions',
                value: stats.totalInterventions,
                description: "Nombre total d'interventions",
                icon: '📊',
                color: 'blue',
            },
            {
                title: 'Interventions Validées',
                value: stats.validatedInterventions,
                description: 'Interventions confirmées',
                icon: '✅',
                color: 'green',
            },
            {
                title: 'En Attente',
                value: stats.pendingInterventions,
                description: 'En attente de validation',
                icon: '⏳',
                color: 'orange',
            },
            {
                title: 'Durée Moyenne',
                value: stats.averageDurationHours,
                description: 'Heures par intervention',
                icon: '⏱️',
                color: 'purple',
                suffix: 'h',
            },
            {
                title: 'Total Heures',
                value: stats.totalWorkHours,
                description: 'Heures de travail total',
                icon: '🕐',
                color: 'indigo',
                suffix: 'h',
            },
            {
                title: 'Taux de Completion',
                value: stats.completionRate,
                description: 'Pourcentage de validation',
                icon: '📈',
                color: 'green',
                suffix: '%',
            },
        ],
        [stats],
    );

    return {
        overviewCards,
    };
};
