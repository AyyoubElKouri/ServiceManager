import { useState, useCallback, useEffect } from 'react';
import { MODAL_CONSTANTS } from '../CreateInterventionModal/CreateInterventionModal.constants';
import type {
    EditInterventionModalProps,
    FormErrors,
    Section,
} from './EditInterventionModal.types';
import type { CreateInterventionData } from '../../files/UserDashboard.types';

/**
 * @hook useEditInterventionModal
 * @description Custom hook that contains all logic for the EditInterventionModal component
 *
 * @param {EditInterventionModalProps} props - Props passed to the EditInterventionModal component
 * @returns {Object} All data and functions needed by the EditInterventionModal component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useEditInterventionModal = (props: EditInterventionModalProps) => {
    const { intervention, onClose, onSubmit, userId } = props;

    const [formData, setFormData] = useState<CreateInterventionData>({
        intervention_id: intervention.intervention_id,
        date: intervention.date.split('T')[0],
        team: intervention.team,
        reference: intervention.reference,
        post: intervention.post,
        maintenance_type: intervention.maintenance_type,
        status: intervention.status,
        work_order_number: intervention.work_order_number,
        work_autorisation_number: intervention.work_autorisation_number,
        planification: intervention.planification,
        reception: intervention.reception,
        start_time: intervention.start_time,
        end_time: intervention.end_time,
        comment: intervention.comment || '',
        validate: intervention.validate,
        section_id: intervention.section_id,
        user_id: userId,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const { name, value, type } = e.target;

            setFormData((prev) => ({
                ...prev,
                [name]:
                    type === 'checkbox'
                        ? (e.target as HTMLInputElement).checked
                        : type === 'number'
                        ? Number(value)
                        : value,
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: '',
                }));
            }
        },
        [errors],
    );

    // Validate form
    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.reference.trim()) {
            newErrors.reference = 'Référence requise';
        }

        if (!formData.post.trim()) {
            newErrors.post = 'Poste requis';
        }

        if (!formData.team) {
            newErrors.team = 'Équipe requise';
        }

        if (!formData.maintenance_type) {
            newErrors.maintenance_type = 'Type de maintenance requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle form submission
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            setIsSubmitting(true);
            try {
                await onSubmit(formData);
            } catch (error) {
                console.error('Error updating intervention:', error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [formData, validateForm, onSubmit],
    );

    // Handle close
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    // Mock sections - In real app, fetch from API
    const sections: Section[] = [
        { id: 1, name: 'Section A' },
        { id: 2, name: 'Section B' },
        { id: 3, name: 'Section C' },
        { id: 4, name: 'Section D' },
    ];

    return {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleSubmit,
        handleClose,
        formLabels: MODAL_CONSTANTS.formLabels,
        sections,
        teams: MODAL_CONSTANTS.teams,
        maintenanceTypes: MODAL_CONSTANTS.maintenanceTypes,
    };
};
