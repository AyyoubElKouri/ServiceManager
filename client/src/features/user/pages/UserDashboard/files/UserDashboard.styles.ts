/**
 * @constant USER_DASHBOARD_STYLES
 * @description Styling classes for the UserDashboard component using modern dark palette
 */
export const USER_DASHBOARD_STYLES = {
    container: 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',

    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',

    // Header section
    header: 'flex justify-between items-center mb-8',
    pageTitle: 'text-3xl font-bold text-white',
    createButton:
        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105',
    createButtonIcon: 'text-xl font-bold',

    // Loading states
    loadingContainer: 'flex flex-col items-center justify-center min-h-96 text-center',
    loadingSpinner: 'animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4',
    loadingText: 'text-slate-300 text-lg',

    // Error states
    errorContainer: 'flex flex-col items-center justify-center min-h-96 text-center',
    errorIcon: 'text-6xl mb-4',
    errorTitle: 'text-2xl font-bold text-red-400 mb-2',
    errorMessage: 'text-slate-300',

    // Interventions section
    interventionsSection: 'mt-8',
    interventionsGrid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6',

    // No data state
    noDataContainer: 'flex flex-col items-center justify-center py-16 text-center',
    noDataIcon: 'text-6xl mb-4 opacity-50',
    noDataMessage: 'text-slate-400 text-lg',
} as const;
