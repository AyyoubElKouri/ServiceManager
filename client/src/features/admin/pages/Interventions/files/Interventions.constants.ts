/**
 * @constant INTERVENTIONS_CONSTANTS
 * @description Constants for the Interventions page
 */
export const INTERVENTIONS_CONSTANTS = {
    teams: ['equipe1', 'equipe2', 'equipe3', 'equipe4'],
    maintenanceTypes: ['coperative', 'preventive', 'corrective', 'urgente'],

    labels: {
        intervention_id: 'ID Intervention',
        date: 'Date',
        team: 'Équipe',
        reference: 'Référence',
        post: 'Poste',
        maintenance_type: 'Type de maintenance',
        status: 'Statut',
        work_order_number: 'N° Ordre de travail',
        work_autorisation_number: 'N° Autorisation',
        planification: 'Planification',
        reception: 'Réception',
        start_time: 'Heure de début',
        end_time: 'Heure de fin',
        comment: 'Commentaire',
        validate: 'Validé',
        section: 'Section',
        user_id: 'ID Utilisateur',
        createdAt: 'Date de création',
    },

    maintenanceTypeLabels: {
        coperative: 'Coopérative',
        preventive: 'Préventive',
        corrective: 'Corrective',
        urgente: 'Urgente',
    },
} as const;
