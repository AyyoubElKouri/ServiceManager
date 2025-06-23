/**
 * @constant CONFIRMATION_MODAL_STYLES
 * @description Styling classes for the ConfirmationModal component
 */
export const CONFIRMATION_MODAL_STYLES = {
    overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50',
    modal: 'bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full mx-4 shadow-2xl',
    header: 'mb-4',
    title: 'text-xl font-bold text-white mb-2',
    message: 'text-slate-300 text-sm leading-relaxed',
    actions: 'flex justify-end space-x-3 mt-6',
    cancelButton: 'px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200',
    confirmButton: 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
} as const;
