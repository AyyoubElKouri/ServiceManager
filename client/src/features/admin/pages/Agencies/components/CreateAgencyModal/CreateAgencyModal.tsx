import { useState, useCallback } from 'react';
import { AGENCIES_STYLES } from '../../Agencies.styles';
import { AGENCIES_CONSTANTS } from '../../Agencies.constants';
import type { CreateAgencyModalProps, CreateAgencyData, FormErrors } from '../../Agencies.types';

/**
 * @component CreateAgencyModal
 * @description Modal component for creating new agencies
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const CreateAgencyModal = ({ isOpen, onClose, onSubmit, isLoading }: CreateAgencyModalProps) => {
    const [formData, setFormData] = useState<CreateAgencyData>({
        name: '',
        adress: '',
        start_time: '',
        end_time: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // Handle input change
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

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
            newErrors.adress = 'L\'adresse ne peut pas dépasser 60 caractères';
        }

        // Validation des heures (format HH:mm)
        const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:00)?$/;
        
        if (formData.start_time && formData.start_time.trim() && !timePattern.test(formData.start_time)) {
            newErrors.start_time = 'L\'heure d\'ouverture doit être au format HH:mm (par exemple, 09:30 ou 14:00)';
        }

        if (formData.end_time && formData.end_time.trim() && !timePattern.test(formData.end_time)) {
            newErrors.end_time = 'L\'heure de fermeture doit être au format HH:mm (par exemple, 09:30 ou 14:00)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle submit
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Pour la création, ne pas envoyer de champs vides
            const submitData: CreateAgencyData = {
                name: formData.name.trim(),
            };

            // N'ajouter les champs optionnels que s'ils ont une valeur
            if (formData.adress && formData.adress.trim()) {
                submitData.adress = formData.adress.trim();
            }
            if (formData.start_time && formData.start_time.trim()) {
                submitData.start_time = formData.start_time.trim();
            }
            if (formData.end_time && formData.end_time.trim()) {
                submitData.end_time = formData.end_time.trim();
            }

            console.log('Creating agency with cleaned data:', submitData);
            await onSubmit(submitData);
            
            // Reset form
            setFormData({
                name: '',
                adress: '',
                start_time: '',
                end_time: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Error creating agency:', error);
        }
    }, [formData, onSubmit, validateForm]);

    // Handle close
    const handleClose = useCallback(() => {
        setFormData({
            name: '',
            adress: '',
            start_time: '',
            end_time: '',
        });
        setErrors({});
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className={AGENCIES_STYLES.modal.overlay} onClick={handleClose}>
            <div
                className={AGENCIES_STYLES.modal.container}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={AGENCIES_STYLES.modal.header}>
                    <h2 className={AGENCIES_STYLES.modal.title}>
                        {AGENCIES_CONSTANTS.modal.createTitle}
                    </h2>
                    <button
                        onClick={handleClose}
                        className={AGENCIES_STYLES.modal.closeButton}
                        disabled={isLoading}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={AGENCIES_STYLES.modal.form}>
                    <div className={AGENCIES_STYLES.form.grid}>
                        {/* Name */}
                        <div className={AGENCIES_STYLES.form.field}>
                            <label className={AGENCIES_STYLES.form.label}>
                                {AGENCIES_CONSTANTS.formLabels.name} *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="Nom de l'agence"
                                required
                                disabled={isLoading}
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
                                value={formData.adress}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="Adresse"
                                disabled={isLoading}
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
                                value={formData.start_time}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="09:00"
                                disabled={isLoading}
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
                                value={formData.end_time}
                                onChange={handleInputChange}
                                className={AGENCIES_STYLES.form.input}
                                placeholder="17:00"
                                disabled={isLoading}
                            />
                            {errors.end_time && (
                                <p className={AGENCIES_STYLES.form.error}>{errors.end_time}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={AGENCIES_STYLES.modal.actions}>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={AGENCIES_STYLES.modal.cancelButton}
                            disabled={isLoading}
                        >
                            {AGENCIES_CONSTANTS.modal.cancel}
                        </button>
                        <button
                            type="submit"
                            className={AGENCIES_STYLES.modal.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? AGENCIES_CONSTANTS.modal.creating : AGENCIES_CONSTANTS.modal.createSubmit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAgencyModal;
