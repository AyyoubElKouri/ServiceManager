import { useState, useCallback } from 'react';
import { AGENCIES_STYLES } from '../../Agencies.styles';
import { AGENCIES_CONSTANTS } from '../../Agencies.constants';
import type { AgencyCardProps, UpdateAgencyData, FormErrors } from '../../Agencies.types';

/**
 * @component AgencyCard
 * @description Card component for displaying and editing individual agency information
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AgencyCard = ({ agency, onUpdate, onDelete, onSetCurrent, isLoading }: AgencyCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateAgencyData>({
        name: agency.name,
        adress: agency.adress,
        start_time: agency.start_time,
        end_time: agency.end_time,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // Get agency initials
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    // Handle input change
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: '' }));
            }
        },
        [errors],
    );

    // Validate form
    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = 'Le nom doit contenir au moins 2 caractères';
        }

        if (formData.name && formData.name.trim().length > 50) {
            newErrors.name = 'Le nom ne peut pas dépasser 50 caractères';
        }

        if (formData.adress && formData.adress.trim().length > 60) {
            newErrors.adress = "L'adresse ne peut pas dépasser 60 caractères";
        }

        // Validation des heures (format HH:mm)
        const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:00)?$/;

        if (
            formData.start_time &&
            formData.start_time.trim() &&
            !timePattern.test(formData.start_time)
        ) {
            newErrors.start_time =
                "L'heure d'ouverture doit être au format HH:mm (par exemple, 09:30 ou 14:00)";
        }

        if (formData.end_time && formData.end_time.trim() && !timePattern.test(formData.end_time)) {
            newErrors.end_time =
                "L'heure de fermeture doit être au format HH:mm (par exemple, 09:30 ou 14:00)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle save
    const handleSave = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        try {
            // Vérifier que l'ID existe
            const agencyId = agency.id || agency.agency_id;
            if (!agencyId) {
                console.error('Agency ID is missing:', agency);
                return;
            }

            // Ne filtrer que les champs qui ont vraiment des valeurs
            const updateData: UpdateAgencyData = {};

            // Toujours inclure le nom s'il est modifié et valide
            if (formData.name && formData.name.trim() && formData.name.trim() !== agency.name) {
                updateData.name = formData.name.trim();
            }

            // Inclure l'adresse si elle est différente (peut être vide pour effacer)
            if (formData.adress !== agency.adress) {
                updateData.adress = formData.adress?.trim() || '';
            }

            // Inclure les heures si elles sont différentes (peuvent être vides pour effacer)
            if (formData.start_time !== agency.start_time) {
                updateData.start_time = formData.start_time?.trim() || '';
            }

            if (formData.end_time !== agency.end_time) {
                updateData.end_time = formData.end_time?.trim() || '';
            }

            // Si aucun changement n'a été détecté, ne pas faire d'appel API
            if (Object.keys(updateData).length === 0) {
                setIsEditing(false);
                return;
            }

            console.log('Updating agency ID:', agencyId, 'with data:', updateData);
            await onUpdate(agencyId, updateData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating agency:', error);
        }
    }, [formData, agency, onUpdate, validateForm]);

    // Handle cancel
    const handleCancel = useCallback(() => {
        setIsEditing(false);
        setFormData({
            name: agency.name,
            adress: agency.adress,
            start_time: agency.start_time,
            end_time: agency.end_time,
        });
        setErrors({});
    }, [agency]);

    // Handle delete
    const handleDelete = useCallback(() => {
        const agencyId = agency.id || agency.agency_id;
        if (!agencyId) {
            console.error('Agency ID is missing for delete:', agency);
            return;
        }
        onDelete(agencyId, agency.name);
    }, [agency, onDelete]);

    // Handle set current
    const handleSetCurrent = useCallback(async () => {
        try {
            const agencyId = agency.id || agency.agency_id;
            if (!agencyId) {
                console.error('Agency ID is missing for set current:', agency);
                return;
            }
            console.log('Setting current agency with ID:', agencyId);
            await onSetCurrent(agencyId);
        } catch (error) {
            console.error('Error setting current agency:', error);
        }
    }, [agency, onSetCurrent]);

    const agencyId = agency.id || agency.agency_id;
    const initials = getInitials(agency.name);
    const createdDate = agency.createdAt ? formatDate(agency.createdAt) : 'Date inconnue';
    const isUpdating = isLoading === 'update';
    const isDeleting = isLoading === 'delete';
    const isSettingCurrent = isLoading === 'setCurrent';
    const isAnyLoading = isUpdating || isDeleting || isSettingCurrent;

    if (isEditing) {
        return (
            <div className={AGENCIES_STYLES.agencyCard.container}>
                <div className={AGENCIES_STYLES.form.container}>
                    <div className={AGENCIES_STYLES.form.grid}>
                        {/* Name */}
                        <div className={AGENCIES_STYLES.form.field}>
                            <label className={AGENCIES_STYLES.form.label}>
                                {AGENCIES_CONSTANTS.formLabels.name}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="Nom de l'agence"
                                required
                                maxLength={50}
                            />
                            {errors.name && (
                                <p className={AGENCIES_STYLES.form.error}>{errors.name}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div className={AGENCIES_STYLES.form.field}>
                            <label className={AGENCIES_STYLES.form.label}>
                                {AGENCIES_CONSTANTS.formLabels.adress}
                            </label>
                            <input
                                type="text"
                                name="adress"
                                value={formData.adress || ''}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="Adresse"
                                maxLength={60}
                            />
                            {errors.adress && (
                                <p className={AGENCIES_STYLES.form.error}>{errors.adress}</p>
                            )}
                        </div>

                        {/* Start Time */}
                        <div className={AGENCIES_STYLES.form.field}>
                            <label className={AGENCIES_STYLES.form.label}>
                                {AGENCIES_CONSTANTS.formLabels.start_time}
                            </label>
                            <input
                                type="time"
                                name="start_time"
                                value={formData.start_time || ''}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="09:00"
                            />
                            {errors.start_time && (
                                <p className={AGENCIES_STYLES.form.error}>{errors.start_time}</p>
                            )}
                        </div>

                        {/* End Time */}
                        <div className={AGENCIES_STYLES.form.field}>
                            <label className={AGENCIES_STYLES.form.label}>
                                {AGENCIES_CONSTANTS.formLabels.end_time}
                            </label>
                            <input
                                type="time"
                                name="end_time"
                                value={formData.end_time || ''}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="17:00"
                            />
                            {errors.end_time && (
                                <p className={AGENCIES_STYLES.form.error}>{errors.end_time}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={AGENCIES_STYLES.form.actions}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={AGENCIES_STYLES.buttons.cancel}
                            disabled={isAnyLoading}
                        >
                            {AGENCIES_CONSTANTS.buttons.cancel}
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className={AGENCIES_STYLES.buttons.save}
                            disabled={isAnyLoading}
                        >
                            {isUpdating
                                ? AGENCIES_CONSTANTS.buttons.saving
                                : AGENCIES_CONSTANTS.buttons.save}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${AGENCIES_STYLES.agencyCard.container} ${
                agency.current ? AGENCIES_STYLES.agencyCard.currentContainer : ''
            }`}
        >
            <div className={AGENCIES_STYLES.agencyCard.content}>
                {/* Left Section - Agency Info */}
                <div className={AGENCIES_STYLES.agencyCard.leftSection}>
                    <div
                        className={`${AGENCIES_STYLES.agencyCard.avatar} ${
                            agency.current ? AGENCIES_STYLES.agencyCard.currentAvatar : ''
                        }`}
                    >
                        {initials}
                    </div>
                    <div className={AGENCIES_STYLES.agencyCard.agencyInfo}>
                        <div className="flex items-center space-x-3">
                            <h3 className={AGENCIES_STYLES.agencyCard.agencyName}>{agency.name}</h3>
                            {agency.current && (
                                <span className={AGENCIES_STYLES.agencyCard.currentBadge}>
                                    {AGENCIES_CONSTANTS.statusLabels.current}
                                </span>
                            )}
                            <span
                                className={
                                    agency.isActive
                                        ? AGENCIES_STYLES.agencyCard.statusBadge.active
                                        : AGENCIES_STYLES.agencyCard.statusBadge.inactive
                                }
                            >
                                {agency.isActive
                                    ? AGENCIES_CONSTANTS.statusLabels.active
                                    : AGENCIES_CONSTANTS.statusLabels.inactive}
                            </span>
                        </div>

                        <div className={AGENCIES_STYLES.agencyCard.contactInfo}>
                            {agency.adress && <p>📍 {agency.adress}</p>}
                            {agency.start_time && agency.end_time && (
                                <p>
                                    🕒 {agency.start_time} - {agency.end_time}
                                </p>
                            )}
                            {agency.phone && <p>📞 {agency.phone}</p>}
                            {agency.email && <p>✉️ {agency.email}</p>}
                        </div>

                        <div className={AGENCIES_STYLES.agencyCard.agencyDetails}>
                            <span>Créé le {createdDate}</span>
                            <span>ID: {agencyId || 'ID manquant'}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className={AGENCIES_STYLES.agencyCard.rightSection}>
                    {!agency.current && (
                        <button
                            onClick={handleSetCurrent}
                            disabled={isAnyLoading}
                            className={AGENCIES_STYLES.buttons.setCurrent}
                        >
                            {isSettingCurrent
                                ? AGENCIES_CONSTANTS.buttons.settingCurrent
                                : AGENCIES_CONSTANTS.buttons.setCurrent}
                        </button>
                    )}
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={isAnyLoading}
                        className={AGENCIES_STYLES.buttons.edit}
                    >
                        {AGENCIES_CONSTANTS.buttons.edit}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isAnyLoading}
                        className={AGENCIES_STYLES.buttons.delete}
                    >
                        {isDeleting
                            ? AGENCIES_CONSTANTS.buttons.deleting
                            : AGENCIES_CONSTANTS.buttons.delete}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgencyCard;
