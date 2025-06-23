import { useEditInterventionModal } from './EditInterventionModal.hook';
import { EDIT_INTERVENTION_MODAL_STYLES } from './EditInterventionModal.styles';
import type { EditInterventionModalProps } from './EditInterventionModal.types';

/**
 * @component EditInterventionModal
 * @description Modal component for editing existing interventions
 *
 * @dependencies useEditInterventionModal hook, EditInterventionModal.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const EditInterventionModal = (props: EditInterventionModalProps) => {
    const {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleSubmit,
        handleClose,
        formLabels,
        sections,
        teams,
        maintenanceTypes,
    } = useEditInterventionModal(props);

    return (
        <div className={EDIT_INTERVENTION_MODAL_STYLES.overlay} onClick={handleClose}>
            <div
                className={EDIT_INTERVENTION_MODAL_STYLES.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={EDIT_INTERVENTION_MODAL_STYLES.header}>
                    <h2 className={EDIT_INTERVENTION_MODAL_STYLES.title}>
                        Modifier l'intervention #{props.intervention.intervention_id}
                    </h2>
                    <button
                        onClick={handleClose}
                        className={EDIT_INTERVENTION_MODAL_STYLES.closeButton}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={EDIT_INTERVENTION_MODAL_STYLES.form}>
                    <div className={EDIT_INTERVENTION_MODAL_STYLES.grid}>
                        {/* Reference */}
                        <div className={EDIT_INTERVENTION_MODAL_STYLES.field}>
                            <label className={EDIT_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.reference}
                            </label>
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleInputChange}
                                className={EDIT_INTERVENTION_MODAL_STYLES.input}
                                required
                                maxLength={100}
                            />
                            {errors.reference && (
                                <p className={EDIT_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.reference}
                                </p>
                            )}
                        </div>

                        {/* Post */}
                        <div className={EDIT_INTERVENTION_MODAL_STYLES.field}>
                            <label className={EDIT_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.post}
                            </label>
                            <input
                                type="text"
                                name="post"
                                value={formData.post}
                                onChange={handleInputChange}
                                className={EDIT_INTERVENTION_MODAL_STYLES.input}
                                required
                                maxLength={100}
                            />
                            {errors.post && (
                                <p className={EDIT_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.post}
                                </p>
                            )}
                        </div>

                        {/* Team */}
                        <div className={EDIT_INTERVENTION_MODAL_STYLES.field}>
                            <label className={EDIT_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.team}
                            </label>
                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleInputChange}
                                className={EDIT_INTERVENTION_MODAL_STYLES.select}
                                required
                            >
                                <option value="">Sélectionner une équipe</option>
                                {teams.map((team) => (
                                    <option key={team} value={team}>
                                        {team}
                                    </option>
                                ))}
                            </select>
                            {errors.team && (
                                <p className={EDIT_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.team}
                                </p>
                            )}
                        </div>

                        {/* Maintenance Type */}
                        <div className={EDIT_INTERVENTION_MODAL_STYLES.field}>
                            <label className={EDIT_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.maintenance_type}
                            </label>
                            <select
                                name="maintenance_type"
                                value={formData.maintenance_type}
                                onChange={handleInputChange}
                                className={EDIT_INTERVENTION_MODAL_STYLES.select}
                                required
                            >
                                <option value="">Sélectionner un type</option>
                                {maintenanceTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.maintenance_type && (
                                <p className={EDIT_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.maintenance_type}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className={EDIT_INTERVENTION_MODAL_STYLES.field}>
                        <label className={EDIT_INTERVENTION_MODAL_STYLES.label}>
                            {formLabels.comment}
                        </label>
                        <textarea
                            name="comment"
                            value={formData.comment || ''}
                            onChange={handleInputChange}
                            className={EDIT_INTERVENTION_MODAL_STYLES.textarea}
                            rows={4}
                            maxLength={3000}
                            placeholder="Commentaire optionnel..."
                        />
                        {errors.comment && (
                            <p className={EDIT_INTERVENTION_MODAL_STYLES.error}>{errors.comment}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className={EDIT_INTERVENTION_MODAL_STYLES.actions}>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={EDIT_INTERVENTION_MODAL_STYLES.cancelButton}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={EDIT_INTERVENTION_MODAL_STYLES.submitButton}
                        >
                            {isSubmitting ? 'Modification...' : "Modifier l'intervention"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditInterventionModal;
