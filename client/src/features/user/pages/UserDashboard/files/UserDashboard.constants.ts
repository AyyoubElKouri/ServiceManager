/**
 * @constant DASHBOARD_CONSTANTS
 * @description Constants for the UserDashboard component
 */
export const DASHBOARD_CONSTANTS = {
    pageTitle: 'Tableau de Bord des Interventions',
    createButtonText: 'Ajouter une Intervention',
    noDataMessage: 'Aucune intervention trouvée',

    // API endpoints
    apiBase: 'http://localhost:8000/api/intervention',

    // Filter options
    statusOptions: [
        { value: 'all', label: 'Tous les statuts' },
        { value: 'sent', label: 'Envoyées' },
        { value: 'saved', label: 'Enregistrées' },
    ],

    validatedOptions: [
        { value: 'all', label: 'Toutes' },
        { value: 'true', label: 'Validées' },
        { value: 'false', label: 'Non validées' },
    ],

    maintenanceTypes: ['coperative', 'preventive', 'corrective', 'urgente'],

    teams: ['equipe1', 'equipe2', 'equipe3', 'equipe4'],
} as const;
