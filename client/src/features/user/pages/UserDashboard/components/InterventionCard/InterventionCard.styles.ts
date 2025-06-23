/**
 * @constant INTERVENTION_CARD_STYLES
 * @description Styling classes for the InterventionCard component using modern dark palette
 */
export const INTERVENTION_CARD_STYLES = {
    container:
        'bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10',

    // Header
    header: 'p-6 border-b border-slate-700',
    headerLeft: 'flex items-center gap-4 mb-2',
    title: 'text-lg font-semibold text-white',
    date: 'text-sm text-slate-400',

    // Status
    status: {
        base: 'px-3 py-1 rounded-full text-xs font-medium',
        sent: 'bg-green-900/30 text-green-400 border border-green-500/30',
        saved: 'bg-orange-900/30 text-orange-400 border border-orange-500/30',
    },

    // Content
    content: 'p-6 space-y-4',
    row: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
    field: 'space-y-1',
    fieldLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wider',
    fieldValue: 'text-sm text-white font-medium',

    // Booleans
    boolean: 'px-2 py-1 rounded text-xs font-medium',
    booleanTrue: 'bg-green-900/30 text-green-400',
    booleanFalse: 'bg-red-900/30 text-red-400',

    // Comment
    commentSection: 'space-y-2',
    comment: 'text-sm text-slate-300 bg-slate-700 p-3 rounded-lg',

    // Footer
    footer: 'p-6 border-t border-slate-700 flex justify-between items-center',
    createdAt: 'text-xs text-slate-400',
    actions: 'flex gap-2',
    editButton:
        'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200',
    sendButton:
        'px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200',
    sentMessage: 'text-sm text-green-400 font-medium',
} as const;
