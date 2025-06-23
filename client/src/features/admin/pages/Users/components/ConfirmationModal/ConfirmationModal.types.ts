/**
 * @interface ConfirmationModalProps
 * @description Props interface for the ConfirmationModal component
 */
export interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}
