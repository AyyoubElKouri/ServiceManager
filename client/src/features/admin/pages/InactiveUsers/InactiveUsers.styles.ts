/**
 * @constant INACTIVE_USERS_STYLES
 * @description Styling classes for the InactiveUsers component using modern dark palette
 */
export const INACTIVE_USERS_STYLES = {
    container: 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',

    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',

    // Header section
    header: 'mb-8',
    pageTitle: 'text-3xl font-bold text-white mb-2',
    subtitle: 'text-slate-300 text-lg',

    // Loading states
    loadingContainer: 'flex flex-col items-center justify-center min-h-96 text-center',
    loadingSpinner: 'animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4',
    loadingText: 'text-slate-300 text-lg',

    // Error states
    errorContainer: 'flex flex-col items-center justify-center min-h-96 text-center',
    errorIcon: 'text-6xl mb-4',
    errorTitle: 'text-2xl font-bold text-red-400 mb-2',
    errorMessage: 'text-slate-300',

    // No data state
    noDataContainer: 'flex flex-col items-center justify-center py-16 text-center',
    noDataIcon: 'text-6xl mb-4 opacity-50',
    noDataMessage: 'text-slate-400 text-lg',

    // Users list
    usersList: 'space-y-4',

    // User card
    userCard: {
        container:
            'bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl',
        content: 'flex items-center justify-between',
        leftSection: 'flex items-center space-x-4',
        avatar: 'w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg',
        userInfo: 'space-y-1',
        userName: 'text-lg font-semibold text-white',
        userEmail: 'text-slate-300 text-sm',
        userDetails: 'flex items-center space-x-4 text-slate-400 text-xs',
        role: 'px-2 py-1 rounded text-xs font-medium bg-slate-700 text-slate-300',
        roleAdmin: 'bg-purple-900/30 text-purple-400',
        roleUser: 'bg-blue-900/30 text-blue-400',
        date: 'text-slate-500',
        rightSection: 'flex items-center space-x-3',
    },

    // Action buttons
    buttons: {
        activate:
            'px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        delete: 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    },
} as const;
