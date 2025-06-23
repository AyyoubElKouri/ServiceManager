import type { Intervention } from '../../files/UserDashboard.types';

/**
 * @interface InterventionCardProps
 * @description Props interface for the InterventionCard component
 */
export interface InterventionCardProps {
    intervention: Intervention;
    onEdit: () => void;
    onSend: () => void;
}
