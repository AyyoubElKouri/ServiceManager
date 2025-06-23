/**
 * @constant AGENCIES_STYLES
 * @description Styling classes for the Agencies component using modern dark palette
 */
export const AGENCIES_STYLES = {
    container: 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',

    // Header
    header: 'flex justify-between items-center mb-8',
    headerLeft: 'space-y-2',
    pageTitle: 'text-3xl font-bold text-white',
    subtitle: 'text-slate-300 text-lg',
    createButton: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105',
    createButtonIcon: 'text-xl font-bold',

    // Loading states
    loadingContainer: 'flex flex-col items-center justify-center min-h-96 text-center',
    loadingSpinner: 'animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4',
    loadingText: 'text-slate-300 text-lg',

    // Error states
    errorContainer: 'flex flex-col items-center justify-center min-h-96 text-center',
    errorIcon: 'text-6xl mb-4',
    errorTitle: 'text-2xl font-bold text-red-400 mb-2',
    errorMessage: 'text-slate-300 mb-4',
    retryButton: 'px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200',

    // No data state
    noDataContainer: 'flex flex-col items-center justify-center py-16 text-center',
    noDataIcon: 'text-6xl mb-4 opacity-50',
    noDataMessage: 'text-slate-400 text-lg',

    // Agencies list
    agenciesList: 'space-y-4',

    // Agency card
    agencyCard: {
        container: 'bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl',
        currentContainer: 'bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/50',
        content: 'flex items-center justify-between',
        leftSection: 'flex items-center space-x-4',
        avatar: 'w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg',
        currentAvatar: 'bg-gradient-to-r from-green-500 to-blue-500',
        agencyInfo: 'space-y-1',
        agencyName: 'text-lg font-semibold text-white',
        agencyDetails: 'flex items-center space-x-4 text-slate-400 text-sm',
        contactInfo: 'space-y-1 text-slate-300 text-sm',
        rightSection: 'flex items-center space-x-3',
        currentBadge: 'px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full',
        statusBadge: {
            active: 'px-2 py-1 bg-green-900/30 text-green-400 text-xs font-medium rounded-full border border-green-500/30',
            inactive: 'px-2 py-1 bg-red-900/30 text-red-400 text-xs font-medium rounded-full border border-red-500/30',
        },
    },

    // Form (edit mode)
    form: {
        container: 'space-y-4',
        grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
        field: 'space-y-2',
        label: 'block text-sm font-medium text-slate-300',
        input: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
        checkbox: 'flex items-center space-x-2',
        checkboxInput: 'w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2',
        checkboxLabel: 'text-sm text-slate-300',
        error: 'text-red-400 text-sm',
        actions: 'flex justify-end space-x-3 pt-4 border-t border-slate-700',
    },

    // Action buttons
    buttons: {
        edit: 'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        save: 'px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        cancel: 'px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200',
        delete: 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        setCurrent: 'px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    },

    // Modal styles
    modal: {
        overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50',
        container: 'bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full mx-4 shadow-2xl',
        header: 'flex justify-between items-center mb-6',
        title: 'text-xl font-bold text-white',
        closeButton: 'text-slate-400 hover:text-white text-2xl transition-colors duration-200',
        form: 'space-y-4',
        actions: 'flex justify-end space-x-3 pt-6 border-t border-slate-700',
        submitButton: 'px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        cancelButton: 'px-6 py-2 text-slate-300 hover:text-white transition-colors duration-200',
    },
} as const;
