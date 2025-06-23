import { useState, useCallback } from 'react';
import { MODAL_CONSTANTS } from './CreateInterventionModal.constants';
import type {
    CreateInterventionModalProps,
    FormErrors,
    Section,
} from './CreateInterventionModal.types';
import type { CreateInterventionData } from '../../files/UserDashboard.types';

/**
 * @hook useCreateInterventionModal
 * @description Custom hook that contains all logic for the CreateInterventionModal component
 *
 * @param {CreateInterventionModalProps} props - Props passed to the CreateInterventionModal component
 * @returns {Object} All data and functions needed by the CreateInterventionModal component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useCreateInterventionModal = (props: CreateInterventionModalProps) => {
    const { onClose, onSubmit, userId } = props;

    const [formData, setFormData] = useState<CreateInterventionData>({
        intervention_id: 0,
        date: new Date().toISOString().split('T')[0],
        team: '',
        reference: '',
        post: '',
        maintenance_type: '',
        status: true,
        work_order_number: 0,
        work_autorisation_number: 0,
        planification: false,
        reception: true,
        start_time: '09:00',
        end_time: '17:00',
        comment: '',
        validate: false,
        section_id: 0,
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

        if (!formData.intervention_id || formData.intervention_id <= 0) {
            newErrors.intervention_id = "ID d'intervention requis";
        }

        if (!formData.date) {
            newErrors.date = 'Date requise';
        }

        if (!formData.team) {
            newErrors.team = 'Équipe requise';
        }

        if (!formData.reference.trim()) {
            newErrors.reference = 'Référence requise';
        }

        if (!formData.post.trim()) {
            newErrors.post = 'Poste requis';
        }

        if (!formData.maintenance_type) {
            newErrors.maintenance_type = 'Type de maintenance requis';
        }

        if (!formData.work_order_number || formData.work_order_number <= 0) {
            newErrors.work_order_number = "Numéro d'ordre de travail requis";
        }

        if (!formData.work_autorisation_number || formData.work_autorisation_number <= 0) {
            newErrors.work_autorisation_number = "Numéro d'autorisation requis";
        }

        if (!formData.start_time) {
            newErrors.start_time = 'Heure de début requise';
        }

        if (!formData.end_time) {
            newErrors.end_time = 'Heure de fin requise';
        }

        if (!formData.section_id || formData.section_id <= 0) {
            newErrors.section_id = 'Section requise';
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
                console.error('Error creating intervention:', error);
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
