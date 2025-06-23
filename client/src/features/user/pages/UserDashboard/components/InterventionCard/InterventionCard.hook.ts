import { useCallback, useMemo } from 'react';
import {
    formatDate,
    formatTime,
    getStatusLabel,
    getMaintenanceTypeLabel,
} from '../../files/UserDashboard.util';
import type { InterventionCardProps } from './InterventionCard.types';

/**
 * @hook useInterventionCard
 * @description Custom hook that contains all logic for the InterventionCard component
 *
 * @param {InterventionCardProps} props - Props passed to the InterventionCard component
 * @returns {Object} All data and functions needed by the InterventionCard component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useInterventionCard = (props: InterventionCardProps) => {
    const { intervention, onEdit, onSend } = props;

    // Formatted data
    const formattedDate = useMemo(() => formatDate(intervention.date), [intervention.date]);
    const formattedStartTime = useMemo(
        () => formatTime(intervention.start_time),
        [intervention.start_time],
    );
    const formattedEndTime = useMemo(
        () => formatTime(intervention.end_time),
        [intervention.end_time],
    );
    const statusLabel = useMemo(
        () => getStatusLabel(intervention.validate),
        [intervention.validate],
    );
    const maintenanceTypeLabel = useMemo(
        () => getMaintenanceTypeLabel(intervention.maintenance_type),
        [intervention.maintenance_type],
    );

    // Status color for styling
    const statusColor = useMemo(() => {
        return intervention.validate ? 'sent' : 'saved';
    }, [intervention.validate]);

    // Determine if actions are available
    const canEdit = useMemo(() => !intervention.validate, [intervention.validate]);
    const canSend = useMemo(() => !intervention.validate, [intervention.validate]);

    // Action handlers
    const handleEdit = useCallback(() => {
        onEdit();
    }, [onEdit]);

    const handleSend = useCallback(() => {
        onSend();
    }, [onSend]);

    return {
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
    };
};
