/**
 * @constant INACTIVE_USERS_CONSTANTS
 * @description Constants for the InactiveUsers component
 */
export const INACTIVE_USERS_CONSTANTS = {
    pageTitle: 'Utilisateurs Inactifs',
    subtitle: "Gérer les comptes en attente d'activation",
    noDataMessage: 'Aucun utilisateur inactif trouvé',
    loadingMessage: 'Chargement des utilisateurs...',

    // API endpoints
    apiEndpoints: {
        getUsers: 'http://localhost:8000/api/user',
        activateUser: (userId: number) => `http://localhost:8000/api/user/active/${userId}`,
        deleteUser: (userId: number) => `http://localhost:8000/api/user/${userId}`,
    },

    // Button texts
    buttons: {
        activate: 'Activer',
        delete: 'Supprimer',
        activating: 'Activation...',
        deleting: 'Suppression...',
    },

    // Messages
    messages: {
        activateSuccess: 'Utilisateur activé avec succès',
        deleteSuccess: 'Utilisateur supprimé avec succès',
        activateError: "Erreur lors de l'activation de l'utilisateur",
        deleteError: "Erreur lors de la suppression de l'utilisateur",
        fetchError: 'Erreur lors du chargement des utilisateurs',
    },

    // Role labels
    roleLabels: {
        user: 'Utilisateur',
        admin: 'Administrateur',
    },
} as const;
