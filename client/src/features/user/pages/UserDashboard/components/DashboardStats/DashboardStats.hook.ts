import { useMemo } from 'react';
import type { DashboardStatsProps, StatCard } from './DashboardStats.types';

/**
 * @hook useDashboardStats
 * @description Custom hook that contains all logic for the DashboardStats component
 *
 * @param {DashboardStatsProps} props - Props passed to the DashboardStats component
 * @returns {Object} All data and functions needed by the DashboardStats component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useDashboardStats = (props: DashboardStatsProps) => {
    const { statistics } = props;

    const statsData = useMemo(
        (): StatCard[] => [
            {
                title: 'Total Interventions',
                value: statistics.totalInterventions,
                description: "Nombre total d'interventions",
                icon: '📊',
                color: 'blue',
            },
            {
                title: 'Interventions Envoyées',
                value: statistics.sentInterventions,
                description: 'Interventions validées et envoyées',
                icon: '✅',
                color: 'green',
            },
            {
                title: 'Interventions Enregistrées',
                value: statistics.savedInterventions,
                description: "En attente d'envoi",
                icon: '💾',
                color: 'orange',
            },
            {
                title: 'Interventions Validées',
                value: statistics.validatedInterventions,
                description: 'Avec statut actif',
                icon: '🔄',
                color: 'purple',
            },
            {
                title: 'En Attente',
                value: statistics.pendingInterventions,
                description: 'Interventions en attente',
                icon: '⏳',
                color: 'yellow',
            },
            {
                title: 'Ce Mois',
                value: statistics.thisMonthInterventions,
                description: 'Interventions du mois en cours',
                icon: '📅',
                color: 'indigo',
            },
        ],
        [statistics],
    );

    return {
        statsData,
    };
};
