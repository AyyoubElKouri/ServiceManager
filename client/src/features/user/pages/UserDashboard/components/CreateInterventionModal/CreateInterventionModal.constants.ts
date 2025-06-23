/**
 * @constant MODAL_CONSTANTS
 * @description Constants for the CreateInterventionModal component
 */
export const MODAL_CONSTANTS = {
    formLabels: {
        intervention_id: 'ID Intervention',
        date: 'Date',
        team: 'Équipe',
        reference: 'Référence',
        post: 'Poste',
        maintenance_type: 'Type de maintenance',
        status: 'Statut actif',
        work_order_number: 'N° Ordre de travail',
        work_autorisation_number: 'N° Autorisation',
        planification: 'Planification',
        reception: 'Réception',
        start_time: 'Heure de début',
        end_time: 'Heure de fin',
        comment: 'Commentaire',
        section_id: 'Section',
    },

    teams: ['equipe1', 'equipe2', 'equipe3', 'equipe4'],

    maintenanceTypes: ['coperative', 'preventive', 'corrective', 'urgente'],
} as const;
