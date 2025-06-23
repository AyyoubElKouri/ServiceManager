import type { CreateInterventionData, Intervention } from '../../files/UserDashboard.types';

/**
 * @interface EditInterventionModalProps
 * @description Props interface for the EditInterventionModal component
 */
export interface EditInterventionModalProps {
    intervention: Intervention;
    onClose: () => void;
    onSubmit: (data: CreateInterventionData) => Promise<void>;
    userId: number;
}

/**
 * @interface FormErrors
 * @description Form validation errors
 */
export interface FormErrors {
    [key: string]: string;
}

/**
 * @interface Section
 * @description Section interface for select options
 */
export interface Section {
    id: number;
    name: string;
}
