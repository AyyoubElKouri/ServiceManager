/**
 * @constant INACTIVE_STYLES
 * @description Styling classes for the Inactive page component
 */
export const INACTIVE_STYLES = {
    container:
        'min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8',
    contentWrapper:
        'max-w-md w-full space-y-8 bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700',
    iconContainer: 'flex justify-center mb-6',
    icon: 'w-16 h-16 text-orange-400',
    textContent: 'text-center space-y-4',
    title: 'text-2xl font-bold text-white mb-2',
    subtitle: 'text-lg text-green-400 font-medium mb-4',
    message: 'text-slate-300 leading-relaxed mb-4',
    additionalInfo: 'text-slate-400 text-sm mb-6',
    buttonContainer: 'space-y-4',
    backButton:
        'w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 transition-colors duration-200',
    contactSection: 'text-center pt-6 border-t border-slate-700',
    contactText: 'text-slate-400 text-sm mb-2',
    contactEmail: 'text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200',
} as const;
