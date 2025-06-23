import { useCreateInterventionModal } from './CreateInterventionModal.hook';
import { CREATE_INTERVENTION_MODAL_STYLES } from './CreateInterventionModal.styles';
import type { CreateInterventionModalProps } from './CreateInterventionModal.types';

/**
 * @component CreateInterventionModal
 * @description Modal component for creating new interventions
 *
 * @dependencies useCreateInterventionModal hook, CreateInterventionModal.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const CreateInterventionModal = (props: CreateInterventionModalProps) => {
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
    } = useCreateInterventionModal(props);

    return (
        <div className={CREATE_INTERVENTION_MODAL_STYLES.overlay} onClick={handleClose}>
            <div
                className={CREATE_INTERVENTION_MODAL_STYLES.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={CREATE_INTERVENTION_MODAL_STYLES.header}>
                    <h2 className={CREATE_INTERVENTION_MODAL_STYLES.title}>
                        Créer une nouvelle intervention
                    </h2>
                    <button
                        onClick={handleClose}
                        className={CREATE_INTERVENTION_MODAL_STYLES.closeButton}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={CREATE_INTERVENTION_MODAL_STYLES.form}>
                    <div className={CREATE_INTERVENTION_MODAL_STYLES.grid}>
                        {/* Intervention ID */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.intervention_id}
                            </label>
                            <input
                                type="number"
                                name="intervention_id"
                                value={formData.intervention_id}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                            />
                            {errors.intervention_id && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.intervention_id}
                                </p>
                            )}
                        </div>

                        {/* Date */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.date}
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                            />
                            {errors.date && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        {/* Team */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.team}
                            </label>
                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.select}
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
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.team}
                                </p>
                            )}
                        </div>

                        {/* Reference */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.reference}
                            </label>
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                                maxLength={100}
                            />
                            {errors.reference && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.reference}
                                </p>
                            )}
                        </div>

                        {/* Post */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.post}
                            </label>
                            <input
                                type="text"
                                name="post"
                                value={formData.post}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                                maxLength={100}
                            />
                            {errors.post && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.post}
                                </p>
                            )}
                        </div>

                        {/* Maintenance Type */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.maintenance_type}
                            </label>
                            <select
                                name="maintenance_type"
                                value={formData.maintenance_type}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.select}
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
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.maintenance_type}
                                </p>
                            )}
                        </div>

                        {/* Work Order Number */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.work_order_number}
                            </label>
                            <input
                                type="number"
                                name="work_order_number"
                                value={formData.work_order_number}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                            />
                            {errors.work_order_number && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.work_order_number}
                                </p>
                            )}
                        </div>

                        {/* Work Authorization Number */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.work_autorisation_number}
                            </label>
                            <input
                                type="number"
                                name="work_autorisation_number"
                                value={formData.work_autorisation_number}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                            />
                            {errors.work_autorisation_number && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.work_autorisation_number}
                                </p>
                            )}
                        </div>

                        {/* Start Time */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.start_time}
                            </label>
                            <input
                                type="time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                            />
                            {errors.start_time && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.start_time}
                                </p>
                            )}
                        </div>

                        {/* End Time */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.end_time}
                            </label>
                            <input
                                type="time"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.input}
                                required
                            />
                            {errors.end_time && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.end_time}
                                </p>
                            )}
                        </div>

                        {/* Section */}
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                            <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                                {formLabels.section_id}
                            </label>
                            <select
                                name="section_id"
                                value={formData.section_id}
                                onChange={handleInputChange}
                                className={CREATE_INTERVENTION_MODAL_STYLES.select}
                                required
                            >
                                <option value="">Sélectionner une section</option>
                                {sections.map((section) => (
                                    <option key={section.id} value={section.id}>
                                        {section.name}
                                    </option>
                                ))}
                            </select>
                            {errors.section_id && (
                                <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                    {errors.section_id}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className={CREATE_INTERVENTION_MODAL_STYLES.checkboxGrid}>
                        <div className={CREATE_INTERVENTION_MODAL_STYLES.checkbox}>
                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleInputChange}
                                id="status"
                                className={CREATE_INTERVENTION_MODAL_STYLES.checkboxInput}
                            />
                            <label
                                htmlFor="status"
                                className={CREATE_INTERVENTION_MODAL_STYLES.checkboxLabel}
                            >
                                {formLabels.status}
                            </label>
                        </div>

                        <div className={CREATE_INTERVENTION_MODAL_STYLES.checkbox}>
                            <input
                                type="checkbox"
                                name="planification"
                                checked={formData.planification}
                                onChange={handleInputChange}
                                id="planification"
                                className={CREATE_INTERVENTION_MODAL_STYLES.checkboxInput}
                            />
                            <label
                                htmlFor="planification"
                                className={CREATE_INTERVENTION_MODAL_STYLES.checkboxLabel}
                            >
                                {formLabels.planification}
                            </label>
                        </div>

                        <div className={CREATE_INTERVENTION_MODAL_STYLES.checkbox}>
                            <input
                                type="checkbox"
                                name="reception"
                                checked={formData.reception}
                                onChange={handleInputChange}
                                id="reception"
                                className={CREATE_INTERVENTION_MODAL_STYLES.checkboxInput}
                            />
                            <label
                                htmlFor="reception"
                                className={CREATE_INTERVENTION_MODAL_STYLES.checkboxLabel}
                            >
                                {formLabels.reception}
                            </label>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className={CREATE_INTERVENTION_MODAL_STYLES.field}>
                        <label className={CREATE_INTERVENTION_MODAL_STYLES.label}>
                            {formLabels.comment}
                        </label>
                        <textarea
                            name="comment"
                            value={formData.comment || ''}
                            onChange={handleInputChange}
                            className={CREATE_INTERVENTION_MODAL_STYLES.textarea}
                            rows={4}
                            maxLength={3000}
                            placeholder="Commentaire optionnel..."
                        />
                        {errors.comment && (
                            <p className={CREATE_INTERVENTION_MODAL_STYLES.error}>
                                {errors.comment}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className={CREATE_INTERVENTION_MODAL_STYLES.actions}>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={CREATE_INTERVENTION_MODAL_STYLES.cancelButton}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={CREATE_INTERVENTION_MODAL_STYLES.submitButton}
                        >
                            {isSubmitting ? 'Création...' : "Créer l'intervention"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInterventionModal;
