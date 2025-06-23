/**
 * @constant EDIT_INTERVENTION_MODAL_STYLES
 * @description Styling classes for the EditInterventionModal component using modern dark palette
 */
export const EDIT_INTERVENTION_MODAL_STYLES = {
    overlay: 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4',
    modal: 'bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden',

    header: 'flex justify-between items-center p-6 border-b border-slate-700',
    title: 'text-2xl font-bold text-white',
    closeButton:
        'text-slate-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors duration-200',

    form: 'p-6 overflow-y-auto max-h-[calc(90vh-120px)]',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6',

    field: 'space-y-2',
    label: 'block text-sm font-medium text-slate-300',
    input: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    select: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    textarea:
        'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical',
    error: 'text-red-400 text-sm',

    actions: 'flex justify-end space-x-4 pt-6 border-t border-slate-700',
    cancelButton: 'px-6 py-2 text-slate-300 hover:text-white transition-colors duration-200',
    submitButton:
        'px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
} as const;
