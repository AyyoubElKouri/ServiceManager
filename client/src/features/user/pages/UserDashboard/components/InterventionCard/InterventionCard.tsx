import { useInterventionCard } from './InterventionCard.hook';
import { INTERVENTION_CARD_STYLES } from './InterventionCard.styles';
import type { InterventionCardProps } from './InterventionCard.types';

/**
 * @component InterventionCard
 * @description Individual intervention card component displaying all intervention data
 *
 * @dependencies useInterventionCard hook, InterventionCard.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const InterventionCard = (props: InterventionCardProps) => {
    const {
        intervention,
        formattedDate,
        formattedStartTime,
        formattedEndTime,
        statusLabel,
        statusColor,
        maintenanceTypeLabel,
        canEdit,
        canSend,
        handleEdit,
        handleSend,
    } = useInterventionCard(props);

    return (
        <div className={INTERVENTION_CARD_STYLES.container}>
            {/* Header */}
            <div className={INTERVENTION_CARD_STYLES.header}>
                <div className={INTERVENTION_CARD_STYLES.headerLeft}>
                    <h3 className={INTERVENTION_CARD_STYLES.title}>
                        Intervention #{intervention.intervention_id}
                    </h3>
                    <span
                        className={`${INTERVENTION_CARD_STYLES.status.base} ${INTERVENTION_CARD_STYLES.status[statusColor]}`}
                    >
                        {statusLabel}
                    </span>
                </div>
                <div className={INTERVENTION_CARD_STYLES.date}>{formattedDate}</div>
            </div>

            {/* Main Content */}
            <div className={INTERVENTION_CARD_STYLES.content}>
                {/* Reference and Post */}
                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Référence:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {intervention.reference}
                        </span>
                    </div>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Poste:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {intervention.post}
                        </span>
                    </div>
                </div>

                {/* Team and Maintenance Type */}
                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Équipe:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {intervention.team}
                        </span>
                    </div>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Type:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {maintenanceTypeLabel}
                        </span>
                    </div>
                </div>

                {/* Section */}
                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Section:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {intervention.section.name}
                        </span>
                    </div>
                </div>

                {/* Work Orders */}
                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>
                            N° Ordre de Travail:
                        </span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {intervention.work_order_number}
                        </span>
                    </div>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>
                            N° Autorisation:
                        </span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {intervention.work_autorisation_number}
                        </span>
                    </div>
                </div>

                {/* Time */}
                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Heure de début:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {formattedStartTime}
                        </span>
                    </div>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Heure de fin:</span>
                        <span className={INTERVENTION_CARD_STYLES.fieldValue}>
                            {formattedEndTime}
                        </span>
                    </div>
                </div>

                {/* Booleans */}
                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Planification:</span>
                        <span
                            className={`${INTERVENTION_CARD_STYLES.boolean} ${
                                intervention.planification
                                    ? INTERVENTION_CARD_STYLES.booleanTrue
                                    : INTERVENTION_CARD_STYLES.booleanFalse
                            }`}
                        >
                            {intervention.planification ? 'Oui' : 'Non'}
                        </span>
                    </div>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Réception:</span>
                        <span
                            className={`${INTERVENTION_CARD_STYLES.boolean} ${
                                intervention.reception
                                    ? INTERVENTION_CARD_STYLES.booleanTrue
                                    : INTERVENTION_CARD_STYLES.booleanFalse
                            }`}
                        >
                            {intervention.reception ? 'Oui' : 'Non'}
                        </span>
                    </div>
                </div>

                <div className={INTERVENTION_CARD_STYLES.row}>
                    <div className={INTERVENTION_CARD_STYLES.field}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Statut actif:</span>
                        <span
                            className={`${INTERVENTION_CARD_STYLES.boolean} ${
                                intervention.status
                                    ? INTERVENTION_CARD_STYLES.booleanTrue
                                    : INTERVENTION_CARD_STYLES.booleanFalse
                            }`}
                        >
                            {intervention.status ? 'Actif' : 'Inactif'}
                        </span>
                    </div>
                </div>

                {/* Comment */}
                {intervention.comment && (
                    <div className={INTERVENTION_CARD_STYLES.commentSection}>
                        <span className={INTERVENTION_CARD_STYLES.fieldLabel}>Commentaire:</span>
                        <p className={INTERVENTION_CARD_STYLES.comment}>{intervention.comment}</p>
                    </div>
                )}
            </div>

            {/* Footer with Actions */}
            <div className={INTERVENTION_CARD_STYLES.footer}>
                <div className={INTERVENTION_CARD_STYLES.createdAt}>
                    Créé le: {new Date(intervention.createdAt).toLocaleDateString('fr-FR')}
                </div>
                <div className={INTERVENTION_CARD_STYLES.actions}>
                    {canEdit && (
                        <>
                            <button
                                onClick={handleEdit}
                                className={INTERVENTION_CARD_STYLES.editButton}
                            >
                                Modifier
                            </button>
                            {canSend && (
                                <button
                                    onClick={handleSend}
                                    className={INTERVENTION_CARD_STYLES.sendButton}
                                >
                                    Envoyer
                                </button>
                            )}
                        </>
                    )}
                    {!canEdit && (
                        <div className={INTERVENTION_CARD_STYLES.sentMessage}>
                            ✅ Intervention déjà soumise
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InterventionCard;
