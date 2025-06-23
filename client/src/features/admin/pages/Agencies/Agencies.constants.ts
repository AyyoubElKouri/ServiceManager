/**
 * @constant AGENCIES_CONSTANTS
 * @description Constants for the Agencies component
 */
export const AGENCIES_CONSTANTS = {
    pageTitle: 'Gestion des Agences',
    subtitle: 'Administration des agences du système',
    loadingMessage: 'Chargement des agences...',
    noDataMessage: 'Aucune agence trouvée',
    errorRetryText: 'Réessayer',
    createButtonText: 'Nouvelle Agence',

    // Form labels
    formLabels: {
        name: 'Nom de l\'agence',
        adress: 'Adresse',
        start_time: 'Heure d\'ouverture',
        end_time: 'Heure de fermeture',
        phone: 'Téléphone',
        email: 'Email',
    },

    // Modal
    modal: {
        createTitle: 'Créer une nouvelle agence',
        editTitle: 'Modifier l\'agence',
        createSubmit: 'Créer l\'agence',
        editSubmit: 'Modifier l\'agence',
        cancel: 'Annuler',
        creating: 'Création...',
        updating: 'Modification...',
    },

    // Buttons
    buttons: {
        save: 'Enregistrer',
        saving: 'Enregistrement...',
        delete: 'Supprimer',
        deleting: 'Suppression...',
        edit: 'Modifier',
        cancel: 'Annuler',
        setCurrent: 'Définir comme active',
        settingCurrent: 'Activation...',
        create: 'Créer',
    },

    // Status labels
    statusLabels: {
        current: 'Agence active',
        active: 'Actif',
        inactive: 'Inactif',
    },

    // Messages
    messages: {
        createSuccess: 'Agence créée avec succès',
        updateSuccess: 'Agence mise à jour avec succès',
        deleteSuccess: 'Agence supprimée avec succès',
        setCurrentSuccess: 'Agence définie comme active',
        createError: 'Erreur lors de la création',
        updateError: 'Erreur lors de la mise à jour',
        deleteError: 'Erreur lors de la suppression',
        setCurrentError: 'Erreur lors de l\'activation',
        loadError: 'Erreur lors du chargement des agences',
    },
} as const;
