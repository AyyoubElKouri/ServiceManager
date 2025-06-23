/**
 * @constant USERS_CONSTANTS
 * @description Constants for the Users component
 */
export const USERS_CONSTANTS = {
    pageTitle: 'Gestion des Utilisateurs',
    subtitle: 'Administration des comptes utilisateurs du système',
    loadingMessage: 'Chargement des utilisateurs...',
    noDataMessage: 'Aucun utilisateur trouvé',
    errorRetryText: 'Réessayer',

    // Form labels
    formLabels: {
        first_name: 'Prénom',
        last_name: 'Nom',
        email: 'Email',
        role: 'Rôle',
        password: 'Mot de passe',
    },

    // Role options
    roleOptions: [
        { value: 'admin', label: 'Administrateur' },
        { value: 'user', label: 'Utilisateur' },
    ],

    // Role labels
    roleLabels: {
        admin: 'Administrateur',
        user: 'Utilisateur',
    } as const,

    // Buttons
    buttons: {
        save: 'Enregistrer',
        saving: 'Enregistrement...',
        delete: 'Supprimer',
        deleting: 'Suppression...',
        edit: 'Modifier',
        cancel: 'Annuler',
    },

    // Messages
    messages: {
        updateSuccess: 'Utilisateur mis à jour avec succès',
        deleteSuccess: 'Utilisateur supprimé avec succès',
        updateError: 'Erreur lors de la mise à jour',
        deleteError: 'Erreur lors de la suppression',
        loadError: 'Erreur lors du chargement des utilisateurs',
    },
} as const;
