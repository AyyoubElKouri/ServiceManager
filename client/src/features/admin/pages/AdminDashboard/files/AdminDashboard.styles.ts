/**
 * @constant ADMIN_DASHBOARD_STYLES
 * @description Styling classes for the AdminDashboard component using modern dark palette
 */
export const ADMIN_DASHBOARD_STYLES = {
    container: 'min-h-screen',

    // Loading states
    loadingContainer: 'min-h-screen flex flex-col items-center justify-center bg-slate-900',
    loadingSpinner: 'animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4',
    loadingText: 'text-slate-300 text-lg',

    // Error states
    errorContainer: 'min-h-screen flex flex-col items-center justify-center bg-slate-900 text-center px-4',
    errorIcon: 'text-6xl mb-4',
    errorTitle: 'text-2xl font-bold text-red-400 mb-2',
    errorMessage: 'text-slate-300 max-w-md',
} as const;
