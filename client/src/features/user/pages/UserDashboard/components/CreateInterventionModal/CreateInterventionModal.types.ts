import type { CreateInterventionData } from '../../files/UserDashboard.types';

/**
 * @interface CreateInterventionModalProps
 * @description Props interface for the CreateInterventionModal component
 */
export interface CreateInterventionModalProps {
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
