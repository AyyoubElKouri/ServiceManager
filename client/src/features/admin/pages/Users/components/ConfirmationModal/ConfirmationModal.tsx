import { CONFIRMATION_MODAL_STYLES } from './ConfirmationModal.styles';
import type { ConfirmationModalProps } from './ConfirmationModal.types';

/**
 * @component ConfirmationModal
 * @description Modal component for confirmation dialogs
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ConfirmationModal = ({
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    isLoading = false,
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={CONFIRMATION_MODAL_STYLES.overlay} onClick={onCancel}>
            <div
                className={CONFIRMATION_MODAL_STYLES.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={CONFIRMATION_MODAL_STYLES.header}>
                    <h3 className={CONFIRMATION_MODAL_STYLES.title}>{title}</h3>
                    <p className={CONFIRMATION_MODAL_STYLES.message}>{message}</p>
                </div>
                
                <div className={CONFIRMATION_MODAL_STYLES.actions}>
                    <button
                        onClick={onCancel}
                        className={CONFIRMATION_MODAL_STYLES.cancelButton}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={CONFIRMATION_MODAL_STYLES.confirmButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Suppression...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
