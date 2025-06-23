import type { NavigationItem } from './AdminSidebar.types';

/**
 * @constant NAVIGATION_ITEMS
 * @description Navigation items for admin sidebar
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        path: '/admin-dashboard',
        label: 'Tableau de Bord',
        icon: '📊',
    },
    {
        path: '/admin-dashboard/statistics',
        label: 'Statistiques',
        icon: '📈',
    },
    {
        path: '/admin-dashboard/interventions',
        label: 'Interventions',
        icon: '🔧',
    },
    {
        path: '/admin-dashboard/users',
        label: 'Utilisateurs',
        icon: '👥',
    },
    {
        path: '/admin-dashboard/inactive-users',
        label: 'Utilisateurs Inactifs',
        icon: '⏸️',
    },
    {
        path: '/admin-dashboard/agencies',
        label: 'Agences',
        icon: '🏢',
    },
];

/**
 * @constant SIDEBAR_CONSTANTS
 * @description Constants for AdminSidebar component
 */
export const SIDEBAR_CONSTANTS = {
    title: 'Administration',
    footerText: 'Système de gestion',
    footerIcon: '⚙️',
} as const;
